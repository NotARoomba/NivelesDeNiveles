use std::env;

use axum::{ extract::Query, response::IntoResponse, routing::get, Json, Router };
use serde::Deserialize;

use crate::status::{ ResponseBody, StatusCodes };

#[derive(Debug, Deserialize)]
pub struct GetParams {
    number: Option<String>,
}

// #[derive(Deserialize)]
// struct SendCodeAttempts {
//     time: String,
//     channel: String,
//     attempt_sid: String,
// }

#[derive(Deserialize)]
struct Lookup {
    // pub carrier: String,
    // pub country_code: String,
    // pub phone_number: String,
    // pub national_format: String,
    // pub url: String,
    // pub add_ons: String,
    // pub add_ons_data: String,
    // pub url_add_ons: String,
    pub valid: bool,
}

#[derive(Deserialize)]
struct SendResponse {
    // pub sid: String,
    // pub service_sid: String,
    // pub account_sid: String,
    // pub to: String,
    // pub channel: String,
    pub status: String,
    // pub valid: bool,
    // pub date_created: String,
    // pub date_updated: String,
    pub lookup: Lookup,
    // pub amount: String,
    // pub payee: String,
    // pub send_code_attempts: Vec<SendCodeAttempts>,
    // pub sna: String,
    // pub url: String,
}

pub async fn send(Query(params): Query<GetParams>) -> impl IntoResponse {
    let tw_sid = env::var("TW_SID").expect("TW_SID must be set");
    let tw_token = env::var("TW_TOKEN").expect("TW_TOKEN must be set");
    let tw_vsid = env::var("TW_VSID").expect("TW_VSID must be set");

    let client = reqwest::Client::new();
    let json = serde_json::json!({
        "to": params.number,
        "channel": "sms",
    });

    let res = client
        .post(format!("https://verify.twilio.com/v2/Services/{}/Verifications", tw_vsid))
        .basic_auth(tw_sid, Some(tw_token))
        .json(&json) // Set JSON body directly
        .send().await;

    if let Ok(response) = res {
        if let Ok(verification) = response.json::<SendResponse>().await {
            if verification.status == "pending" {
                return Json(ResponseBody::<u8>::new(StatusCodes::Success, None)).into_response();
            } else if !verification.lookup.valid {
                return Json(
                    ResponseBody::<u8>::new(StatusCodes::NumberNotExist, None)
                ).into_response();
            }
        }
    } else if let Err(e) = res {
        let status = e.status().unwrap().as_u16();
        if status == 429 {
            return Json(
                ResponseBody::<u8>::new(StatusCodes::TooManyAttempts, None)
            ).into_response();
        } else if status == 60200 {
            return Json(ResponseBody::<u8>::new(StatusCodes::NumberNotExist, None)).into_response();
        }
    }
    Json(ResponseBody::<u8>::new(StatusCodes::ErrorSendingCode, None)).into_response()
}

pub async fn check(Json(body): Json<GetParams>) -> impl IntoResponse {
    let tw_sid = env::var("TW_SID").expect("TW_SID must be set");
    let tw_token = env::var("TW_TOKEN").expect("TW_TOKEN must be set");
    let tw_vsid = env::var("TW_VSID").expect("TW_VSID must be set");

    let client = reqwest::Client::new();
    let json = serde_json::json!({
        "code": body.number,
        "to": body.number,
    });

    let res = client
        .post(format!("https://verify.twilio.com/v2/Services/{}/VerificationCheck", tw_vsid))
        .basic_auth(tw_sid, Some(tw_token))
        .json(&json) // Set JSON body directly
        .send().await;

    if let Ok(response) = res {
        if let Ok(verification) = response.json::<SendResponse>().await {
            if verification.status == "approved" {
                return Json(ResponseBody::<u8>::new(StatusCodes::Success, None)).into_response();
            } else {
                return Json(ResponseBody::<u8>::new(StatusCodes::CodeDenied, None)).into_response();
            }
        }
    } else if let Err(e) = res {
        let status = e.status().unwrap().as_u16();
        if status == 400 && status == 60200 {
            return Json(ResponseBody::<u8>::new(StatusCodes::CodeDenied, None)).into_response();
        } else if status == 404 && status == 20404 {
            return Json(ResponseBody::<u8>::new(StatusCodes::CodeExpired, None)).into_response();
        }
    }
    Json(ResponseBody::<u8>::new(StatusCodes::CodeFailed, None)).into_response()
}

pub fn get_routes() -> Router {
    Router::new()
        .route(
            "/send",
            get({
                move |params| async move { send(params).await }
            })
        )
        .route(
            "/check",
            get({
                move |body| async move { check(body).await }
            })
        )
}
