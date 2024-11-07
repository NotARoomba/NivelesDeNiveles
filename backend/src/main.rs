use axum::{ extract::Request, routing::get, Router, ServiceExt };
use dotenv::dotenv;
use socketioxide::SocketIo;
use tower::Layer;
use tracing::info;
use std::{ env, sync::Arc };
use tokio::net::TcpListener;
use tracing_subscriber::FmtSubscriber;
use tower_http::normalize_path::NormalizePathLayer;

mod utils;
mod routes;
mod types;
mod websocket;

#[tokio::main]
async fn main() {
    dotenv().ok();

    let _ = tracing::subscriber::set_global_default(FmtSubscriber::default());

    let (layer, io) = SocketIo::new_layer();

    let collections = Arc::new(
        utils::init_database(&io).await.expect("Failed to initialize database")
    );

    io.ns("/", {
        let collections = Arc::clone(&collections);
        move |s| websocket::on_connect(s, collections)
    });

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

    let app = NormalizePathLayer::trim_trailing_slash().layer(app);

    let port = env::var("PORT").unwrap_or_else(|_| "3000".to_string());
    info!("Server running on port {}", port);

    let listener = TcpListener::bind(format!("0.0.0.0:{}", port)).await.expect(
        "Failed to bind to port"
    );
    axum::serve(listener, ServiceExt::<Request>::into_make_service(app)).await.expect(
        "Server error"
    );
}
