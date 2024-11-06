import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-es';
import Config from 'react-native-config';
import STATUS_CODES from '../../backend/models/status';

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? value : null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export async function callAPI(
  endpoint: string,
  method: string,
  body: object = {},
) {
  const time = Date.now().toString();
  const data = JSON.stringify(body);
  const digest = CryptoJS.enc.Hex.stringify(
    CryptoJS.HmacSHA256(
      time + method + endpoint + CryptoJS.MD5(data).toString(),
      Math.floor(Date.now() / (30 * 1000)).toString(),
    ),
  );
  const hmac = `HMAC ${time}:${digest}`;
  try {
    return method === 'POST'
      ? await (
          await fetch(Config.API_URL + endpoint, {
            method: method,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: hmac,
            },
            body: JSON.stringify(body),
          })
        ).json()
      : await (
          await fetch(Config.API_URL + endpoint, {
            method: method,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: hmac,
            },
          })
        ).json();
  } catch (error: any) {
    console.log(error);
    if (!error.response) return {status: STATUS_CODES.NO_CONNECTION};
    // Alert.alert('Error!', 'No podemos conectar a nuestro servidor! Revisa tu conexion al internet.')
    return {
      status: STATUS_CODES.GENERIC_ERROR,
    };
  }
}
