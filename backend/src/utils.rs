use futures::{ StreamExt, TryStreamExt };
use models::notification::TargetChannelType;
use models::StringMap;
use mongodb::bson::doc;
use mongodb::change_stream::event::OperationType;
use mongodb::options::{ FullDocumentBeforeChangeType, FullDocumentType };
use mongodb::{ Client, Collection, IndexModel };
use socketioxide::SocketIo;
use tracing::info;
use std::env;
use crate::types::{ DangerLevel, Incident, Location, Report, Sensor, User, WebSocketEvents };

use onesignal_rust_api::*;
use onesignal_rust_api::apis::configuration::Configuration;
use onesignal_rust_api::models::Notification;

const EARTH_RADIUS: i64 = 6378100;

#[derive(Debug, Clone)]
pub struct Collections {
    pub users: Collection<User>,
    pub reports: Collection<Report>,
    pub sensors: Collection<Sensor>,
    pub incidents: Collection<Incident>,
}

pub async fn init_database(io: &SocketIo) -> Result<Collections, String> {
    let uri: String = env::var("MONGODB").expect("MONGODB must be set");
    let client = Client::with_uri_str(uri).await.expect("Failed to connect to MongoDB");
    let user_db = client.database(
        env::var("USER_DATABASE").expect("USER_DATABASE must be set").as_str()
    );
    let users = user_db.collection(
        env::var("USER_COLLECTION").expect("USER_COLLECTION must be set").as_str()
    ) as Collection<User>;

    let info_db = client.database(
        env::var("INFO_DATABASE").expect("INFO_DATABASE must be set").as_str()
    );
    let reports = info_db.collection(
        env::var("REPORT_COLLECTION").expect("REPORT_COLLECTION must be set").as_str()
    ) as Collection<Report>;
    let sensors = info_db.collection(
        env::var("SENSOR_COLLECTION").expect("SENSOR_COLLECTION must be set").as_str()
    ) as Collection<Sensor>;
    let incidents = info_db.collection(
        env::var("INCIDENT_COLLECTION").expect("INCIDENT_COLLECTION must be set").as_str()
    ) as Collection<Incident>;
    if
        incidents
            .list_indexes().await
            .expect("Failed to get the incidents indexes")
            .count().await == 0
    {
        incidents
            .create_index(
                IndexModel::builder()
                    .keys(doc! { "location": "2dsphere" })
                    .build()
            ).await
            .expect("Failed to create the incident index");
    }
    if reports.list_indexes().await.expect("Failed to get the reports indexes").count().await == 0 {
        reports
            .create_index(
                IndexModel::builder()
                    .keys(doc! { "location": "2dsphere" })
                    .build()
            ).await
            .expect("Failed to create the reports index");
    }

    if sensors.list_indexes().await.expect("Failed to get the sensors indexes").count().await == 0 {
        users
            .create_index(
                IndexModel::builder()
                    .keys(doc! { "location": "2dsphere" })
                    .build()
            ).await
            .expect("Failed to create the sensors index");
    }
    if users.list_indexes().await.expect("Failed to get the users indexes").count().await == 0 {
        users
            .create_index(
                IndexModel::builder()
                    .keys(doc! { "location": "2dsphere" })
                    .build()
            ).await
            .expect("Failed to create the users index");
    }
    let pipeline = vec![
        doc! {
            "$match": {
                "$or": [
                    { "operationType": "insert" },
                    { "operationType": "update" }
                ]
            }
        }
    ];

    let configuration = create_configuration();

    let _ = sensors
        .watch()
        .pipeline(pipeline)
        .full_document_before_change(FullDocumentBeforeChangeType::Required)
        .full_document(FullDocumentType::Required).await
        .expect("Failed to watch collection")
        .for_each_concurrent(None, |change| async {
            let change = change.expect("Failed to get change");
            if change.operation_type == OperationType::Update {
                let updated_sensor = change.full_document
                    .as_ref()
                    .expect("Failed to get full document");
                let before_sensor = change.full_document_before_change
                    .as_ref()
                    .expect("Failed to get full document before change");
                if updated_sensor.status != before_sensor.status {
                    let incidents_vec = incidents
                        .find(doc! { "type": &updated_sensor.sensor_type, "over": false }).await
                        .expect("Failed to find incidents");
                    let incidents_vec: Vec<Incident> = incidents_vec
                        .try_collect().await
                        .expect("Error collecting incidents");
                    let incidents_vec = incidents_vec
                        .into_iter()
                        .filter(|incident| {
                            haversine::distance(
                                haversine::Location {
                                    latitude: updated_sensor.location.coordinates[1],
                                    longitude: updated_sensor.location.coordinates[0],
                                },
                                haversine::Location {
                                    latitude: incident.location.coordinates[1],
                                    longitude: incident.location.coordinates[0],
                                },
                                haversine::Units::Kilometers
                            ) < (incident.range as f64)
                        })
                        .collect::<Vec<_>>();
                    if incidents_vec.len() == 0 {
                        incidents
                            .insert_one(Incident {
                                incident_type: updated_sensor.sensor_type.clone(),
                                level: DangerLevel::Safe,
                                number_of_reports: 1,
                                timestamp: chrono::Utc::now().timestamp(),
                                been_notified: false,
                                over: false,
                                range: 3,
                                location: updated_sensor.location.clone(),
                            }).await
                            .expect("Failed to insert incident");
                    }
                    for incident in incidents_vec {
                        if incident.level != updated_sensor.status {
                            incidents
                                .update_one(
                                    doc! { "location": incident.location },
                                    doc! {
                                    "$set": {
                                        "level": &updated_sensor.status,
                                        "range": if updated_sensor.status == DangerLevel::Safe {
                                            0
                                        } else if updated_sensor.status == DangerLevel::Risk {
                                            3
                                        } else {
                                            6
                                        },
                                        "timestamp": chrono::Utc::now().timestamp(),
                                        "number_of_reports": if updated_sensor.status == DangerLevel::Safe {
                                            0 
                                        } else if updated_sensor.status == DangerLevel::Risk {
                                            3
                                        } else {
                                            6
                                        }
                                    }
                                }
                                ).await
                                .expect("Failed to update incident");
                        } else {
                            incidents
                                .update_one(
                                    doc! { "location": incident.location },
                                    doc! {
                                    "$inc": { "number_of_reports": 1 },
                                    "$set": {
                                        "range": incident.number_of_reports + 1,
                                        "timestamp": chrono::Utc::now().timestamp()
                                    }
                                }
                                ).await
                                .expect("Failed to update incident");
                        }
                    }
                }
            }
        });
    let _ = reports
        .watch().await
        .expect("Failed to watch collection")
        .for_each_concurrent(None, |change| async {
            let change = change.expect("Failed to get change");
            if change.operation_type == OperationType::Insert {
                let report = change.full_document.as_ref().expect("Failed to get full document");
                let incidents_vec = incidents
                    .find(doc! { "type": &report.report_type, "over": false }).await
                    .expect("Failed to find incidents");
                let incidents_vec: Vec<Incident> = incidents_vec
                    .try_collect().await
                    .expect("Error collecting incidents");
                let incidents_vec = incidents_vec
                    .into_iter()
                    .filter(|incident| {
                        haversine::distance(
                            haversine::Location {
                                latitude: report.location.coordinates[1],
                                longitude: report.location.coordinates[0],
                            },
                            haversine::Location {
                                latitude: incident.location.coordinates[1],
                                longitude: incident.location.coordinates[0],
                            },
                            haversine::Units::Kilometers
                        ) < (incident.range as f64)
                    })
                    .collect::<Vec<_>>();
                if incidents_vec.len() == 0 {
                    incidents
                        .insert_one(Incident {
                            incident_type: report.report_type.clone(),
                            level: DangerLevel::Safe,
                            number_of_reports: 1,
                            timestamp: chrono::Utc::now().timestamp(),
                            been_notified: false,
                            over: false,
                            range: 3,
                            location: report.location.clone(),
                        }).await
                        .expect("Failed to insert incident");
                }
                for incident in incidents_vec {
                    incidents
                        .update_one(
                            doc! { "location": incident.location },
                            doc! { "$inc": { "numberOfReports": 1 } }
                        ).await
                        .expect("Failed to update incident");
                }
            }
        });
    let _ = incidents
        .watch()
        .full_document(FullDocumentType::Required)
        .full_document_before_change(FullDocumentBeforeChangeType::Required).await
        .expect("Failed to watch incidents")
        .for_each_concurrent(None, |change| async {
            let change = change.expect("Failed to get change");
            if
                change.operation_type == OperationType::Update &&
                change.update_description
                    .expect("No update description")
                    .updated_fields.contains_key("numberOfReports")
            {
                info!("Updated Incident!");
                let updated_incident = change.full_document.expect("No full document");
                let before_incident = change.full_document_before_change.expect(
                    "No before change document"
                );
                let current_level = get_level(updated_incident.number_of_reports);
                let current_range = get_range(updated_incident.number_of_reports);
                incidents
                    .update_one(
                        doc! { "_id": change.document_key.expect("No document id") },
                        doc! {"$set": {
                        "range": current_range,
                        "level": &current_level
                    }}
                    ).await
                    .expect("Error updating range and level for incident");
                let users_in_zone = users
                    .find(
                        doc! { "location": {"$geoWithin": {"$centerSphere": [updated_incident.location.coordinates.to_vec(), current_range / EARTH_RADIUS]}} }
                    ).await
                    .expect("Error finding users");
                let users_in_zone: Vec<User> = users_in_zone
                    .try_collect().await
                    .expect("Error collecting users");
                for user in users_in_zone {
                    send_notification(&configuration, &user.number, &current_level).await;
                }
                if updated_incident.number_of_reports < before_incident.number_of_reports {
                    let outer_users = users
                        .find(
                            doc! { "location": {"$geoWithin": {"$centerSphere": [updated_incident.location.coordinates.to_vec(), get_range(before_incident.number_of_reports) / EARTH_RADIUS]}} }
                        ).await
                        .expect("Failed to get outer users");
                    let outer_users: Vec<User> = outer_users
                        .try_collect().await
                        .expect("Error collecting outer users");
                    if
                        before_incident.level != DangerLevel::Safe &&
                        updated_incident.level == DangerLevel::Safe
                    {
                        for user in outer_users {
                            send_notification(&configuration, &user.number, &current_level).await;
                        }
                    } else {
                        let inner_users = users
                            .find(
                                doc! { "location": {"$geoWithin": {"$centerSphere": [updated_incident.location.coordinates.to_vec(), current_range / EARTH_RADIUS]}} }
                            ).await
                            .expect("Failed to get inner users");
                        let inner_users: Vec<User> = inner_users
                            .try_collect().await
                            .expect("Error collecting inner users");
                        let safe_users = outer_users
                            .into_iter()
                            .filter(|u| !inner_users.contains(u));
                        for user in safe_users {
                            send_notification(&configuration, &user.number, &current_level).await;
                        }
                    }
                }
                let current_incidents = incidents
                    .find(doc! { "over": false }).await
                    .expect("Error finding current incidents");
                let current_incidents: Vec<Incident> = current_incidents
                    .try_collect().await
                    .expect("Error collecting incidents");
                if current_incidents.len() > 1 {
                    for i in 0..current_incidents.len() {
                        for j in 0..current_incidents.len() {
                            if i != j {
                                if
                                    current_incidents[i].incident_type ==
                                        current_incidents[j].incident_type &&
                                    haversine::distance(
                                        haversine::Location {
                                            latitude: current_incidents[i].location.coordinates[1],
                                            longitude: current_incidents[i].location.coordinates[0],
                                        },
                                        haversine::Location {
                                            latitude: current_incidents[j].location.coordinates[1],
                                            longitude: current_incidents[j].location.coordinates[0],
                                        },
                                        haversine::Units::Kilometers
                                    ) <=
                                        (
                                            (current_incidents[i].range +
                                                current_incidents[j].range) as f64
                                        )
                                {
                                    let new_center = [
                                        (current_incidents[i].location.coordinates[0] +
                                            current_incidents[j].location.coordinates[0]) /
                                            2.0,
                                        (current_incidents[i].location.coordinates[1] +
                                            current_incidents[j].location.coordinates[1]) /
                                            2.0,
                                    ];
                                    let new_incident = Incident {
                                        incident_type: current_incidents[i].incident_type.clone(),
                                        level: get_level(
                                            current_incidents[i].number_of_reports +
                                                current_incidents[j].number_of_reports
                                        ),
                                        number_of_reports: current_incidents[i].number_of_reports +
                                        current_incidents[j].number_of_reports,
                                        location: Location {
                                            location_type: "Point".into(),
                                            coordinates: new_center,
                                        },
                                        timestamp: chrono::Utc::now().timestamp(),
                                        been_notified: false,
                                        over: false,
                                        range: current_incidents[i].range +
                                        current_incidents[j].range,
                                    };
                                    incidents
                                        .insert_one(new_incident).await
                                        .expect("Error inserting merged incident");
                                    io.emit(WebSocketEvents::UpdateLocationData, &0).ok();
                                    return;
                                }
                            }
                        }
                    }
                }
            }
            io.emit(WebSocketEvents::UpdateLocationData, &0).ok();
        });
    info!("Connected to MongoDB!");
    Ok(Collections { users, reports, sensors, incidents })
}

pub fn create_configuration() -> Box<Configuration> {
    let mut configuration = apis::configuration::Configuration::new();
    configuration.app_key_token = Some(
        String::from(env::var("ONESIGNAL_API_KEY").expect("ONESIGNAL_API_KEY must be set"))
    );
    Box::new(configuration)
}

pub fn create_notification(level: &DangerLevel, number: String) -> Box<Notification> {
    let mut notification = Notification::new(
        String::from(env::var("ONESIGNAL_APP_ID").expect("ONESIGNAL_APP_ID must be set"))
    );
    let mut contents_map = StringMap::new();
    let mut headers_map = StringMap::new();

    contents_map.en = Some(
        String::from(
            format!("You are now in a {} zone!", if level == &DangerLevel::Safe {
                "safe"
            } else if level == &DangerLevel::Risk {
                "risk"
            } else {
                "danger"
            })
        )
    );
    contents_map.es = Some(
        String::from(
            format!("Ahora se encuentra en una zona {}!", if level == &DangerLevel::Safe {
                "segura"
            } else if level == &DangerLevel::Risk {
                "de riesgo"
            } else {
                "de peligro"
            })
        )
    );
    contents_map.fr = Some(
        String::from(
            format!("Vous êtes dans une zone de {}!", if level == &DangerLevel::Safe {
                "sûr"
            } else if level == &DangerLevel::Risk {
                "risque"
            } else {
                "danger"
            })
        )
    );
    contents_map.zh_hans = Some(
        String::from(
            format!("该地区的状态{}!", if level == &DangerLevel::Safe {
                "安全"
            } else if level == &DangerLevel::Risk {
                "风险"
            } else {
                "危险"
            })
        )
    );

    headers_map.en = Some(String::from("Niveles De Niveles"));
    headers_map.es = Some(String::from("Niveles De Niveles"));
    headers_map.fr = Some(String::from("Niveles De Niveles"));
    headers_map.zh_hans = Some(String::from("Niveles De Niveles"));

    notification.headings = Some(Box::new(headers_map));
    notification.contents = Some(Box::new(contents_map));
    notification.is_chrome_web = Some(true);
    notification.is_any_web = Some(true);

    notification.include_external_user_ids = Some(vec![number.to_string()]);
    notification.target_channel = Some(TargetChannelType::Push);

    Box::new(notification)
}

async fn send_notification(
    configuration: &Box<Configuration>,
    number: &String,
    level: &DangerLevel
) {
    let notification = create_notification(level, number.clone());
    let res = onesignal_rust_api::apis::default_api::create_notification(
        &configuration,
        *notification
    ).await;
    match res {
        Ok(_) => (),
        Err(e) => println!("Error sending notification: {:?}", e),
    }
}

fn get_range(n: i64) -> i64 {
    n * 50 + 50
}
fn get_level(n: i64) -> DangerLevel {
    match n {
        _ if n < 3 => DangerLevel::Safe,
        _ if n < 6 => DangerLevel::Risk,
        _ => DangerLevel::Danger,
    }
}
