use std::sync::Arc;
use axum::{ extract, response::IntoResponse, routing::get, Json, Router };
use futures::StreamExt;
use mongodb::bson::doc;
use serde_json::json;

use crate::{ types::{ Sensor, StatusCodes }, utils::Collections };

pub async fn get_sensor(collections: &Collections) -> impl IntoResponse {
    let sensors = collections.sensors.find(doc! {}).await.unwrap();
    let sensors = sensors
        .collect::<Vec<_>>().await
        .into_iter()
        .map(|s| s.unwrap())
        .collect::<Vec<_>>();
    Json(json!({"status": StatusCodes::Success, "sensors": sensors}))
}

pub async fn update_sensor(
    extract::Json(body): extract::Json<Sensor>,
    collections: &Collections
) -> impl IntoResponse {
    let sensor: Sensor = body.into();
    let update_result = collections.sensors
        .update_one(
            doc! { "name": &sensor.name },
            doc! { "$set": {"name": &sensor.name, "status": sensor.status as i32, "type": sensor.sensor_type as i32, "location.coordinates": [sensor.location.coordinates[0], sensor.location.coordinates[1]], "location.type": "Point"} }
        )
        .upsert(true).await;
    if update_result.is_err() {
        return Json(json!({"status": StatusCodes::GenericError}));
    } else {
        return Json(json!({"status": StatusCodes::Success}));
    }
}

pub fn get_routes(collections: Arc<Collections>) -> Router {
    Router::new().route(
        "/",
        get({
            let collections = Arc::clone(&collections);
            move || async move { get_sensor(&*collections).await }
        }).post({
            let collections = Arc::clone(&collections);
            move |body| async move { update_sensor(body, &*collections).await }
        })
    )
}
