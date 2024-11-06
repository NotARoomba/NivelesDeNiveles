use std::sync::Arc;

use futures::StreamExt;
use mongodb::bson::doc;
use serde_json::json;
use socketioxide::extract::{ AckSender, Data, SocketRef };
use tracing::info;

use crate::{ types::{ DangerLevel, WebSocketEvents }, utils::Collections };

pub fn on_connect(socket: SocketRef, collections: Arc<Collections>) {
    info!("Client connected");
    socket.emit(WebSocketEvents::UpdateLocationData.as_ref(), &0).ok();
    // const user = await collections.users?.findOne({number});
    //           if (!user)
    //             return callback({
    //               status: DangerLevel.SAFE,
    //               sensors: [],
    //               incidents: [],
    //             });
    //           let incidents = (await collections.incidents
    //             ?.find({over: false})
    //             .toArray()) as unknown as Incident[];
    //           // incidents.filter(
    //           //   incident =>
    //           //     { const dist = haversine(
    //           //       {
    //           //         lat: user.location.coordinates[1],
    //           //         lon: user.location.coordinates[0],
    //           //       },
    //           //       {
    //           //         lat: incident.location.coordinates[1],
    //           //         lon: incident.location.coordinates[0],
    //           //       },
    //           //     ); console.log(dist, incident.range); return dist < incident.range}
    //           // );
    //           // const incidents: Incident[] = (await collections.incidents
    //           //   ?.find({
    //           //     location: {
    //           //       $geoWithin: {
    //           //         $centerSphere: {...user.location},
    //           //         $maxDistance: 2000,
    //           //       },
    //           //     },
    //           //     over: false,
    //           //   })
    //           //   .toArray()) as unknown as Incident[];
    //           let status = DangerLevel.SAFE;
    //           for (let incident of incidents) {
    //             if (
    //               incident.level > status &&
    //               haversine(
    //                 {
    //                   lat: user.location.coordinates[1],
    //                   lon: user.location.coordinates[0],
    //                 },
    //                 {
    //                   lat: incident.location.coordinates[1],
    //                   lon: incident.location.coordinates[0],
    //                 },
    //               ) < incident.range
    //             )
    //               status = incident.level;
    //           }
    //           const sensors: Sensor[] = (await collections.sensors
    //             ?.find({})
    //             .toArray()) as unknown as Sensor[];
    //           // console.log(sensors)
    //           callback({status, sensors, incidents}, user);
    //         },
    //       );
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
                let incidents = incidents
                    .collect::<Vec<_>>().await
                    .into_iter()
                    .map(|i| i.unwrap())
                    .collect::<Vec<_>>();
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
