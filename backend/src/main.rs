use axum::{
    routing::get,
    Router,
};
use std::env;
use dotenv::dotenv;
mod database;

#[tokio::main]
async fn main() {
    dotenv().ok();
    // build our application with a single route
    // let collections = database::init_database().await.unwrap();
    let app = Router::new().route("/", get(|| async { "You're not supposed to be here!" }));
    let port = env::var("PORT").unwrap_or("3000".to_string());
    // run our app with hyper, listening globally on the port
    println!("Server running on port {}", port);
    let listener = tokio::net::TcpListener::bind(format!("0.0.0.0:{port}")).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}