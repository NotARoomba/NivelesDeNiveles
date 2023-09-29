import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import axios from 'axios';
import CryptoJS from 'crypto-es';

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
  image?: string,
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
  // console.log(Config.API_URL + endpoint)
  try {
    return (await axios(Config.API_URL + endpoint, {
            method: method,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: hmac,
            },
            data: JSON.stringify(body),
            maxBodyLength: 20000000
          })).data
  } catch (error) {
    console.log(error);
    return {
      error: true,
      msg: 'No podemos conectar a nuestro servidor! Revisa tu conexion al internet.',
    };
  }
}
