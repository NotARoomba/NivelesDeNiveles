use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub enum STATUS_CODES {
  SUCCESS = 0,
  GENERIC_ERROR,
  USER_NOT_FOUND,
  INVALID_NUMBER,
  SENT_CODE,
  NUMBER_NOT_EXIST,
  ERROR_SENDING_CODE,
  TOO_MANY_ATTEMPTS,
  CODE_DENIED,
  CODE_EXPIRED,
  CODE_FAILED,
  ALREADY_REPORTED,
  MISMATCHED_IMAGE,
  NO_CONNECTION,
  INVALID_DATA
}
#[derive(Debug, Serialize, Deserialize)]
pub struct ResponseBody<T> {
    pub status: u8,
    pub data: Option<T>,
}

impl<T> ResponseBody<T> {
    pub fn new(status: STATUS_CODES, data: Option<T>) -> ResponseBody<T> {
        ResponseBody {
            status: status as u8, 
            data,
        }
    }
}