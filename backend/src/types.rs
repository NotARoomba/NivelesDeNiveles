use mongodb::bson::{ bson, doc, Bson };
use serde::{ Deserialize, Serialize };
use strum_macros::AsRefStr;

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
pub struct Location {
    pub coordinates: [f64; 2],
    #[serde(rename = "type")]
    pub location_type: String,
}

impl Into<Bson> for Location {
    fn into(self) -> Bson {
        bson!( {
            "coordinates": self.coordinates.to_vec(),
            "type": self.location_type,
        })
    }
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
pub struct User {
    pub number: String,
    pub location: Location,
}

impl Default for User {
    fn default() -> Self {
        User {
            number: String::from(""),
            location: Location {
                coordinates: [0.0, 0.0],
                location_type: String::from("Point"),
            },
        }
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
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

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
pub enum DangerType {
    Fire,
    Flood,
    Landslide,
}

impl Into<Bson> for DangerType {
    fn into(self) -> Bson {
        match self {
            DangerType::Fire => Bson::Int32(0),
            DangerType::Flood => Bson::Int32(1),
            DangerType::Landslide => Bson::Int32(2),
        }
    }
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Eq, PartialOrd, Ord, Clone)]
pub enum DangerLevel {
    Safe,
    Risk,
    Danger,
}
impl Into<Bson> for DangerLevel {
    fn into(self) -> Bson {
        match self {
            DangerLevel::Safe => Bson::Int32(0),
            DangerLevel::Risk => Bson::Int32(1),
            DangerLevel::Danger => Bson::Int32(2),
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Incident {
    #[serde(rename = "type")]
    pub incident_type: DangerType,
    pub level: DangerLevel,
    #[serde(rename = "numberOfReports")]
    pub number_of_reports: i64,
    pub location: Location,
    pub timestamp: i64,
    #[serde(rename = "beenNotified")]
    pub been_notified: bool,
    pub over: bool,
    pub range: i64,
}

#[derive(Debug, Deserialize, Clone, Copy)]
pub enum StatusCodes {
    Success = 0,
    GenericError,
    UserNotFound,
    InvalidNumber,
    SentCode,
    NumberNotExist,
    ErrorSendingCode,
    TooManyAttempts,
    CodeDenied,
    CodeExpired,
    CodeFailed,
    AlreadyReported,
    MismatchedImage,
    NoConnection,
    InvalidData,
}
impl Serialize for StatusCodes {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error> where S: serde::Serializer {
        serializer.serialize_u8(*self as u8)
    }
}

#[derive(Debug, Serialize, Deserialize, AsRefStr)]
pub enum WebSocketEvents {
    #[strum(serialize = "connect")]
    Connect,
    #[strum(serialize = "disconnenct")]
    Disconnect,
    #[strum(serialize = "request_location_data")]
    RequestLocationData,
    #[strum(serialize = "update_location_data")]
    UpdateLocationData,
}
