use serde::{ Deserialize, Serialize };

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
