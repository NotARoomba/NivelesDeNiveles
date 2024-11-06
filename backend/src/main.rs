use axum::{ routing::get, Router };
use dotenv::dotenv;
use socketioxide::SocketIo;
use tracing::info;
use std::{ env, sync::Arc };
use tokio::net::TcpListener;
use tracing_subscriber::FmtSubscriber;

mod utils;
mod routes;
mod types;
mod websocket;

#[tokio::main]
async fn main() {
    dotenv().ok();

    let _ = tracing::subscriber::set_global_default(FmtSubscriber::default());

    let (layer, io) = SocketIo::new_layer();

    // Initialize the database and wrap it in an Arc for shared access
    let collections = Arc::new(
        utils::init_database(&io).await.expect("Failed to initialize database")
    );

    io.ns("/", {
        let collections = Arc::clone(&collections);
        move |s| websocket::on_connect(s, collections)
    });

    // Build the application router with nested routes
    let app = Router::new()
        .route(
            "/",
            get(|| async { "You're not supposed to be here!" })
        )
        .nest("/users", routes::users::get_routes(Arc::clone(&collections)))
        .nest("/verify", routes::verify::get_routes())
        .nest("/sensors", routes::sensors::get_routes(Arc::clone(&collections)))
        .nest("/report", routes::report::get_routes(Arc::clone(&collections)))
        .layer(layer);

    // Retrieve the PORT environment variable or default to 3000

    let port = env::var("PORT").unwrap_or_else(|_| "3000".to_string());
    info!("Server running on port {}", port);

    // Bind to the specified port and start the server
    let listener = TcpListener::bind(format!("0.0.0.0:{}", port)).await.expect(
        "Failed to bind to port"
    );
    axum::serve(listener, app).await.expect("Server error");
}
