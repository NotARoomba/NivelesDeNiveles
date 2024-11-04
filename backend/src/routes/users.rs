use axum::{ extract::{ self, Query }, response::IntoResponse, routing::get, Json, Router };
use futures::StreamExt;
use mongodb::bson::doc;
use serde::Deserialize;
use std::sync::Arc;
use crate::{
    types::{ DangerLevel, User, ResponseBody, StatusCodes },
    utils::{ create_configuration, create_notification, Collections },
};

#[derive(Debug, Deserialize)]
pub struct GetParams {
    number: Option<String>,
}

pub async fn get_user(
    Query(params): Query<GetParams>,
    collections: &Collections
) -> impl IntoResponse {
    // println!("Getting user with number: {:?}", params.number);
    let user = collections.users.find_one(doc! { "number": params.number }).await.unwrap_or(None);
    match user {
        Some(user) => Json(ResponseBody::new(StatusCodes::Success, Some(user))),
        None => Json(ResponseBody::<User>::new(StatusCodes::UserNotFound, None)),
    }
}

pub async fn update_user(
    extract::Json(u): extract::Json<User>,
    collections: &Collections
) -> impl IntoResponse {
    if u.location.coordinates.len() != 2 {
        return Json(ResponseBody::<u8>::new(StatusCodes::InvalidData, None));
    } else if u.number.len() == 0 {
        return Json(ResponseBody::<u8>::new(StatusCodes::InvalidNumber, None));
    }
    let user = u.clone();
    if user.location.coordinates.len() == 2 {
        let before_user = collections.users
            .find_one(doc! { "number": user.number.clone() }).await
            .unwrap()
            .unwrap_or(User::default());
        if before_user == User::default() {
            return Json(ResponseBody::<u8>::new(StatusCodes::UserNotFound, None));
        } else if before_user == user {
            return Json(ResponseBody::<u8>::new(StatusCodes::Success, None));
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
            let notification = create_notification(current_danger_level, user.number.clone());
            let res = onesignal_rust_api::apis::default_api::create_notification(
                &configuration,
                *notification
            ).await;
            match res {
                Ok(_) => (),
                Err(e) => println!("Error sending notification: {:?}", e),
            }
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
        Ok(_) => Json(ResponseBody::<u8>::new(StatusCodes::Success, None)),
        Err(e) => {
            println!("Error updating user: {:?}", e);
            return Json(ResponseBody::<u8>::new(StatusCodes::GenericError, None));
        }
    }
}

pub fn get_routes(collections: Arc<Collections>) -> Router {
    Router::new().route(
        "/",
        get({
            let collections = Arc::clone(&collections);
            move |params| async move { get_user(params, &*collections).await }
        }).post({
            let collections = Arc::clone(&collections);
            move |body| async move { update_user(body, &*collections).await }
        })
    )
}
