use std::sync::Arc;

use futures::{ StreamExt, TryStreamExt };
use mongodb::bson::doc;
use serde_json::json;
use socketioxide::extract::{ AckSender, Data, SocketRef };
use tracing::info;

use crate::{ types::{ DangerLevel, Incident, WebSocketEvents }, utils::Collections };

pub fn on_connect(socket: SocketRef, collections: Arc<Collections>) {
    info!("Client connected");
    socket.emit(WebSocketEvents::UpdateLocationData.as_ref(), &0).ok();
    socket.on(
        WebSocketEvents::UpdateLocationData.as_ref(),
        move |Data::<String>(number), ack: AckSender| async move {
            info!(number = number.as_str(), "Received location data");
            let user = collections.users.find_one(doc! { "number": number }).await.unwrap();
            if user.is_none() {
                ack.send(
                    &json!({
                        "status": DangerLevel::Safe as u8,
                        "sensors": Vec::<u8>::new(),
                        "incidents": Vec::<u8>::new()}
                    )
                ).ok();
                return;
            } else {
                let incidents = collections.incidents.find(doc! { "over": false }).await.unwrap();
                let incidents: Vec<Incident> = incidents
                    .try_collect().await
                    .expect("Error collecting incidents");
                let mut status = &DangerLevel::Safe;
                for incident in &incidents {
                    if incident.level > *status {
                        status = &incident.level;
                    }
                }
                let sensors = collections.sensors.find(doc! {}).await.unwrap();
                let sensors = sensors
                    .collect::<Vec<_>>().await
                    .into_iter()
                    .map(|s| s.unwrap())
                    .collect::<Vec<_>>();
                ack.send(
                    &json!({
                        "status": DangerLevel::Safe as u8,
                        "sensors": sensors,
                        "incidents": incidents}
                )
                ).ok();
            }
        }
    );
}
