use models::notification::TargetChannelType;
use models::StringMap;
use mongodb::{ Client, Collection };
use tracing::info;
use std::env;
use crate::types::{ DangerLevel, Incident, Report, Sensor, User };

use onesignal_rust_api::*;
use onesignal_rust_api::apis::configuration::Configuration;
use onesignal_rust_api::models::Notification;

#[derive(Debug, Clone)]
pub struct Collections {
    pub users: Collection<User>,
    pub reports: Collection<Report>,
    pub sensors: Collection<Sensor>,
    pub incidents: Collection<Incident>,
}

pub async fn init_database() -> Result<Collections, String> {
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

pub fn create_notification(level: DangerLevel, number: String) -> Box<Notification> {
    let mut notification = Notification::new(
        String::from(env::var("ONESIGNAL_APP_ID").expect("ONESIGNAL_APP_ID must be set"))
    );
    let mut contents_map = StringMap::new();
    let mut headers_map = StringMap::new();

    contents_map.en = Some(
        String::from(
            format!("You are now in a {} zone!", if level == DangerLevel::Safe {
                "safe"
            } else if level == DangerLevel::Risk {
                "risk"
            } else {
                "danger"
            })
        )
    );
    contents_map.es = Some(
        String::from(
            format!("Ahora se encuentra en una zona {}!", if level == DangerLevel::Safe {
                "segura"
            } else if level == DangerLevel::Risk {
                "de riesgo"
            } else {
                "de peligro"
            })
        )
    );
    contents_map.fr = Some(
        String::from(
            format!("Vous êtes dans une zone de {}!", if level == DangerLevel::Safe {
                "sûr"
            } else if level == DangerLevel::Risk {
                "risque"
            } else {
                "danger"
            })
        )
    );
    contents_map.zh_hans = Some(
        String::from(
            format!("该地区的状态{}!", if level == DangerLevel::Safe {
                "安全"
            } else if level == DangerLevel::Risk {
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
