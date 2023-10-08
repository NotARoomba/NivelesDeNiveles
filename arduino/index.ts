import os from 'os';
import crypto from 'crypto'
const {ReadlineParser} = require('@serialport/parser-readline');
import {SerialPort} from 'serialport';
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
const parser = port.pipe(new ReadlineParser({delimiter: '\r\n'}));
parser.on('data', async (data: string) => {
  let json: null | Sensor = null;
  data = data.toString().trim();
  try {
    json = JSON.parse(data);
  } catch {
    json = null;
  }
  if (json && json.status !== beforeStatus) {
    beforeStatus = json.status;
    console.log(`STATUS CHANGED TO ${json.status}!`);
    console.log(data)
    // post data to api
    // const time = Date.now().toString();
    // const digest = CryptoJS.enc.Hex.stringify(
    //   CryptoJS.HmacSHA256(
    //     time + 'POST' + '/sensors' + CryptoJS.MD5(data).toString(),
    //     Math.floor(Date.now() / (30 * 1000)).toString(),
    //   ),
    // );
    // const hmac = `HMAC ${time}:${digest}`;
    const hmac = crypto.createHmac("sha256", Math.floor(Date.now() / (30 * 1000)).toString());
    const time = Date.now().toString();

    hmac.update(time);
    hmac.update("POST");
    hmac.update("/sensors/");

    const contentHash = crypto.createHash("md5");
    contentHash.update(data);

    hmac.update(contentHash.digest("hex"));

    const res = await (
      await fetch(env.API_URL + '/sensors/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `HMAC ${time}:${hmac.digest("hex")}`,
        },
        body: data,
      })
    ).json();
    console.log(res);
    if (res.error) {
      console.log(`ERROR: ${res.msg ?? res.info}`);
    } else {
      console.log('Succesfully sent data!');
    }
  }
});
