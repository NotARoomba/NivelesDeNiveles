use std::{ env, sync::Arc };

use axum::{
    extract::{ self, DefaultBodyLimit },
    response::IntoResponse,
    routing::post,
    Json,
    Router,
};
use base64::{ prelude::BASE64_STANDARD, Engine };
use futures::StreamExt;
use mongodb::bson::doc;
use serde::{ Deserialize, Serialize };
use serde_json::json;

use crate::{ types::{ DangerType, Report, StatusCodes }, utils::Collections };

#[derive(Debug, Deserialize, Serialize)]
struct Prediction {
    confidence: f64,
}

#[derive(Debug, Deserialize, Serialize)]
struct AIResponse {
    predictions: Vec<Prediction>,
}

pub async fn send_report(
    extract::Json(body): extract::Json<Report>,
    collections: &Collections
) -> impl IntoResponse {
    let report: Report = body.into();
    if
        let Ok(mut past_reports) = collections.reports.find(
            doc! { "reporter": &report.reporter, "over": false }
        ).await
    {
        if past_reports.by_ref().count().await >= 1 {
            let mut min_distance = f64::INFINITY;
            while let Some(past_report) = past_reports.next().await {
                let past_report = past_report.as_ref().unwrap();
                min_distance = min_distance.min(
                    haversine::distance(
                        haversine::Location {
                            latitude: report.location.coordinates[1],
                            longitude: report.location.coordinates[0],
                        },
                        haversine::Location {
                            latitude: past_report.location.coordinates[1],
                            longitude: past_report.location.coordinates[0],
                        },
                        haversine::Units::Kilometers
                    )
                );
            }
            if min_distance > 500.0 {
                return Json(json!({"status": StatusCodes::AlreadyReported}));
            }
        }
        if BASE64_STANDARD.decode(&report.image).is_ok() {
            let response: AIResponse = reqwest::Client
                ::new()
                .post(match report.report_type {
                    DangerType::Fire => "https://detect.roboflow.com/fire-smoke-detection-eozii/1",
                    DangerType::Flood => "https://detect.roboflow.com/flood-detection-3susv/1",
                    DangerType::Landslide => "https://detect.roboflow.com/landslides-pyn83/1",
                })
                .query(&[("api_key", env::var("AI_AUTH").expect("AI_AUTH must be set"))])
                .body(report.image.clone())
                .header("Content-Type", "application/x-www-form-urlencoded")
                .send().await
                .unwrap()
                .json().await
                .unwrap();
            if response.predictions.is_empty() {
                return Json(json!({"status": StatusCodes::MismatchedImage}));
            }
            let prediction_avg =
                response.predictions
                    .iter()
                    .map(|p| p.confidence)
                    .sum::<f64>() / (response.predictions.len() as f64);
            println!(
                "REPORT PREDICTION AVERAGE: {}% FOR DISASTER TYPE {:#?}",
                prediction_avg,
                &report.report_type
            );
            if prediction_avg < 0.7 {
                return Json(json!({"status": StatusCodes::MismatchedImage}));
            } else {
                collections.reports.insert_one(report).await.unwrap();
                return Json(json!({"status": StatusCodes::Success}));
            }
        } else {
            return Json(json!({"status": StatusCodes::MismatchedImage}));
        }
    } else {
        return Json(json!({"status": StatusCodes::GenericError}));
    }
}

pub fn get_routes(collections: Arc<Collections>) -> Router {
    Router::new().route(
        "/",
        post({
            move |body| async move { send_report(body, &*collections).await }
        }).layer(DefaultBodyLimit::disable())
    )
}
