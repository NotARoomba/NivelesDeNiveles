use serde::{ Deserialize, Serialize };

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Location {
    pub coordinates: [f64; 2],
    #[serde(rename = "type")]
    pub location_type: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct User {
    pub number: String,
    pub location: Location,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Report {
    pub reporter: String,
    #[serde(rename = "type")]
    pub report_type: DangerType,
    pub level: DangerLevel,
    pub timestamp: i64,
    pub image: String,
    pub over: bool,
    pub location: Location,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Sensor {
    pub name: String,
    pub status: DangerLevel,
    #[serde(rename = "type")]
    pub sensor_type: DangerType,
    pub location: Location,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum DangerType {
    Fire,
    Flood,
    Earthquake,
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Eq, PartialOrd, Ord)]
pub enum DangerLevel {
    Safe,
    Risk,
    Danger,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Incident {
    #[serde(rename = "type")]
    pub incident_type: DangerType,
    pub level: DangerLevel,
    pub number_of_reports: i64,
    pub location: Location,
    pub timestamp: i64,
    pub been_notified: bool,
    pub over: bool,
    pub range: i64,
}
