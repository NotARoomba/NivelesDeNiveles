export enum NivelesEvents {
    CONNECT = 'connect',
    CONNECT_ERROR = 'connect_error',
    DISCONNECT = 'disconnect',
    REPORT = 'report',
    VERIFY = 'verify',
    CHECK = 'check',
    DATA_UPDATE = 'data_update',
    USER_UPDATE = 'user_update',
    GET_USER = 'get_user',
    GET_SENSORS = 'get_sensors',
    SENSOR_UPDATE = 'sensor_update',
    INCIDENTS_UPDATE = 'incident_nearby'
}

export default NivelesEvents;