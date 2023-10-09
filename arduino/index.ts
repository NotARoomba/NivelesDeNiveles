import os from 'os';
import CryptoJS from 'crypto-js';
import {ReadlineParser} from '@serialport/parser-readline';
import {SerialPort, SerialPortOpenOptions} from 'serialport';
import * as dotenv from 'ts-dotenv';
import Sensor from '../backend/models/sensor';

const env = dotenv.load({
  API_URL: String,
});

let beforeStatus = 0;

const port = new SerialPort({
  path: os.platform() === 'linux' ? '/dev/ttyACM0' : 'COM5',
  baudRate: 9600,
});

port.open(err => {
  if (err) {
    return console.log('Error opening port: ', err.message);
  }
  console.log('Port Opened!');
});
// @ts-ignore
const parser = port.pipe(new ReadlineParser({delimiter: '\r\n'}));
parser.on('data', async (data: string) => {
  let json: null | Sensor = null;
  try {
    json = JSON.parse(data);
  } catch {
    json = null;
  }
  // console.log(data)
  if (json && json.status !== beforeStatus) {
    beforeStatus = json.status;
    console.log(`STATUS CHANGED TO ${json.status}!`);
    // console.log(data)
    // post data to api
    const time = Date.now().toString();
    const digest = CryptoJS.enc.Hex.stringify(
      CryptoJS.HmacSHA256(
        time +
          'POST' +
          '/sensors' +
          CryptoJS.MD5(JSON.stringify(json)).toString(),
        Math.floor(Date.now() / (30 * 1000)).toString(),
      ),
    );
    const hmac = `HMAC ${time}:${digest}`;

    fetch(env.API_URL + '/sensors', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: hmac,
      },
      body: JSON.stringify(json),
    });
  }
});
