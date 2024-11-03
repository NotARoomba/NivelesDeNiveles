use axum::{routing::get, Router};
use dotenv::dotenv;
use std::{env, sync::Arc};
use tokio::net::TcpListener;

mod utils;
mod status;
mod routes;
mod types;


#[tokio::main]
async fn main() {
    dotenv().ok();
    
    // Initialize the database and wrap it in an Arc for shared access
    let collections = Arc::new(utils::init_database().await.expect("Failed to initialize database"));

    // Build the application router with nested routes
    let app = Router::new()
        .route("/", get(|| async { "You're not supposed to be here!" }))
        .nest("/users", routes::users::get_routes(Arc::clone(&collections)))
        .nest("/verify", routes::verify::get_routes());

    // Retrieve the PORT environment variable or default to 3000
    let port = env::var("PORT").unwrap_or_else(|_| "3000".to_string());
    println!("Server running on port {}", port);

    // Bind to the specified port and start the server
    let listener = TcpListener::bind(format!("0.0.0.0:{}", port))
        .await
        .expect("Failed to bind to port");
    axum::serve(listener, app).await.expect("Server error");
}

