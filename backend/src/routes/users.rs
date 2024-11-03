use axum::{ extract::{ self, Query }, response::IntoResponse, routing::{ get }, Json, Router };
use futures::StreamExt;
use mongodb::bson::doc;
use serde::Deserialize;
use std::sync::Arc;
use crate::{
    status::{ ResponseBody, STATUS_CODES },
    types::{ DangerLevel, User },
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
        Some(user) => Ok(Json(ResponseBody::new(STATUS_CODES::SUCCESS, Some(user)))),
        None => Err(Json(ResponseBody::<User>::new(STATUS_CODES::USER_NOT_FOUND, None))),
    }
}

pub async fn update_user(
    extract::Json(u): extract::Json<User>,
    collections: &Collections
) -> impl IntoResponse {
    if u.location.coordinates.len() != 2 {
        return Err(Json(ResponseBody::<u8>::new(STATUS_CODES::INVALID_DATA, None)));
    } else if u.number.len() == 0 {
        return Err(Json(ResponseBody::<u8>::new(STATUS_CODES::INVALID_NUMBER, None)));
    }
    let user = u.clone();
    if user.location.coordinates.len() == 2 {
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
        let before_user = collections.users
            .find_one(doc! { "number": user.number.clone() }).await
            .unwrap()
            .unwrap();
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
    let res = collections.users
        .update_one(
            doc! { "number": user.number },
            doc! { "location": {"coordinates" : [user.location.coordinates[0], user.location.coordinates[1]], "type": user.location.location_type} }
        )
        .upsert(true).await
        .unwrap();
    match res.upserted_id {
        Some(_) => Ok(Json(ResponseBody::<u8>::new(STATUS_CODES::SUCCESS, None))),
        None => Err(Json(ResponseBody::<u8>::new(STATUS_CODES::USER_NOT_FOUND, None))),
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
