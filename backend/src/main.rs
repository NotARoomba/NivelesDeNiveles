use axum::{
    routing::get,
    Router,
};
use std::env;
use dotenv::dotenv;

#[tokio::main]
async fn main() {
    dotenv().ok();
    // build our application with a single route
    let app = Router::new().route("/", get(|| async { "Hello, World!" }));
    let port = env::var("PORT").unwrap_or("3000".to_string());
    // run our app with hyper, listening globally on the port
    println!("Server running on port {}", port);
    let listener = tokio::net::TcpListener::bind(format!("0.0.0.0:{port}")).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}