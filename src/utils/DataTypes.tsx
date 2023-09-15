import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import CryptoJS from 'crypto-es';
import {StyleSheet} from 'react-native';

export interface User {
  number: string;
  location: {type: 'Point'; coordinates: Array<Number>};
}

export interface ScreenProp {
  isDarkMode: boolean;
}
export interface FunctionScreenProp {
  isDarkMode: boolean;
  updateFunction: Function[];
}

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 6,
  },
});

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
  } catch (error) {
    console.log(error);
    return {
      error: true,
      msg: 'No podemos conectar a nuestro servidor! Revisa tu conexion al internet.',
    };
  }
}
