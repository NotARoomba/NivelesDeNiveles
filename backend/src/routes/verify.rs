use axum::{routing::get, Router};

pub async fn list() -> &'static str {
    "VERIFY LIST"
 }
  
pub fn get_routes() -> Router {
    Router::new()
        .route("/", get(list))
}