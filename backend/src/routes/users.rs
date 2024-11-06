use axum::{ extract::{ self, Path }, response::IntoResponse, routing::{ get, post }, Json, Router };
use futures::StreamExt;
use mongodb::bson::doc;
use serde_json::json;
use tracing::info;
use std::sync::Arc;
use crate::{
    types::{ DangerLevel, StatusCodes, User },
    utils::{ create_configuration, create_notification, send_notification, Collections },
};

pub async fn get_user(Path(number): Path<String>, collections: &Collections) -> impl IntoResponse {
    // println!("Getting user with number: {:?}", params.number);
    let user = collections.users.find_one(doc! { "number": number }).await.unwrap_or(None);
    match user {
        Some(user) => Json(json!({"status": StatusCodes::Success, "user": user})),
        None => Json(json!({"status": StatusCodes::UserNotFound})),
    }
}

pub async fn update_user(
    extract::Json(u): extract::Json<User>,
    collections: &Collections
) -> impl IntoResponse {
    info!("Updating user: {:?}", u);
    if u.location.coordinates.len() != 2 {
        return Json(json!({"status": StatusCodes::InvalidData}));
    } else if u.number.len() == 0 {
        return Json(json!({"status": StatusCodes::InvalidNumber}));
    }
    let user = u.clone();
    if user.location.coordinates.len() == 2 {
        let before_user = collections.users
            .find_one(doc! { "number": user.number.clone() }).await
            .unwrap()
            .unwrap_or(User::default());
        if before_user == User::default() {
            return Json(json!({"status": StatusCodes::UserNotFound}));
        } else if before_user == user {
            return Json(json!({"status": StatusCodes::Success}));
        }
        let mut incidents = collections.incidents.find(doc! { "over": false }).await.unwrap();
        let current_incidents = incidents
            .by_ref()
            .collect::<Vec<_>>().await
            .into_iter()
            .filter(|i| {
                let incident = i.as_ref().unwrap();
                haversine::distance(
                    haversine::Location {
                        latitude: user.location.coordinates[1],
                        longitude: user.location.coordinates[0],
                    },
                    haversine::Location {
                        latitude: incident.location.coordinates[1],
                        longitude: incident.location.coordinates[0],
                    },
                    haversine::Units::Kilometers
                ) < (incident.range as f64)
            })
            .collect::<Vec<_>>();
        let before_incidents = incidents
            .collect::<Vec<_>>().await
            .into_iter()
            .filter(|i| {
                let incident = i.as_ref().unwrap();
                haversine::distance(
                    haversine::Location {
                        latitude: before_user.location.coordinates[1],
                        longitude: before_user.location.coordinates[0],
                    },
                    haversine::Location {
                        latitude: incident.location.coordinates[1],
                        longitude: incident.location.coordinates[0],
                    },
                    haversine::Units::Kilometers
                ) < (incident.range as f64)
            })
            .collect::<Vec<_>>();
        let mut current_danger_level = DangerLevel::Safe;
        let mut before_danger_level = DangerLevel::Safe;
        for i in before_incidents {
            let incident = i.unwrap();
            if incident.level > before_danger_level {
                before_danger_level = incident.level;
            }
        }
        for i in current_incidents {
            let incident = i.unwrap();
            if incident.level > current_danger_level {
                current_danger_level = incident.level;
            }
        }
        if current_danger_level != before_danger_level {
            let configuration = create_configuration();
            send_notification(&configuration, &user.number, &current_danger_level).await;
        }
    }
    let update_result = collections.users
        .update_one(
            doc! { "number": user.number },
            doc! { "$set": {"location.coordinates": [user.location.coordinates[0], user.location.coordinates[1]], "location.type": user.location.location_type } }
        )
        .upsert(true).await;
    // .map_err(|_| {
    //     return Json(ResponseBody::<u8>::new(StatusCodes::GenericError, None));
    // });
    match update_result {
        Ok(_) => Json(json!({"status": StatusCodes::Success})),
        Err(e) => {
            println!("Error updating user: {:?}", e);
            return Json(json!({"status": StatusCodes::GenericError}));
        }
    }
}

pub fn get_routes(collections: Arc<Collections>) -> Router {
    Router::new()
        .route(
            "/",
            post({
                let collections = Arc::clone(&collections);
                move |body| async move { update_user(body, &*collections).await }
            })
        )
        .route(
            "/:number",
            get({
                let collections = Arc::clone(&collections);
                move |params| async move { get_user(params, &*collections).await }
            })
        )
}
