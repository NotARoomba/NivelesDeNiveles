use mongodb::{
	Client,
	Collection 
};
use std::env;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct Location {
    coordinates: [f32; 2],
    #[serde(rename = "type")]
    location_type: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub(crate) struct User {
    number: String,
    location: Location,
}
pub(crate) struct Collections {
    pub 
    users: Collection<User>,
}

pub(crate) async fn init_database() -> Result<Collections, String> {
    let uri: String = env::var("MONGODB").expect("MONGODB must be set");
    let client = Client::with_uri_str(uri).await.expect("Failed to connect to MongoDB");
    let db = client.database(env::var("USER_DATABASE").expect("USER_DATABASE must be set").as_str());
    let users = db.collection(env::var("USER_COLLECTION").expect("USER_COLLECTION must be set").as_str()) as Collection<User>;
    println!("Connected to MongoDB!");
    Ok(Collections { users })
}