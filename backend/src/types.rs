use serde::{ Deserialize, Serialize };
use strum_macros::AsRefStr;

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
pub struct Location {
    pub coordinates: [f64; 2],
    #[serde(rename = "type")]
    pub location_type: String,
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

#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum DangerType {
    Fire,
    Flood,
    Landslide,
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Eq, PartialOrd, Ord, Clone)]
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

#[derive(Debug, Serialize, Deserialize)]
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

#[derive(Debug, Serialize, Deserialize)]
pub struct ResponseBody<T> {
    pub status: u8,
    pub data: Option<T>,
}

impl<T> ResponseBody<T> {
    pub fn new(status: StatusCodes, data: Option<T>) -> ResponseBody<T> {
        ResponseBody {
            status: status as u8,
            data,
        }
    }
}
