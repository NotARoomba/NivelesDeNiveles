import serial
import time
import json 
import Crypto
import hmac, math, requests
from dotenv import load_dotenv


config = dotenv_values(".env")
arduino = serial.Serial(port='/dev/ttyACM0', baudrate=9600, timeout=.1)
beforeStatus = 0
def is_json(myjson):
  try:
    json.loads(myjson)
  except ValueError as e:
    return False
  return True

while True:
    data = arduino.readline().strip().decode('utf-8').strip()
    if (is_json(data)):
        r = json.loads(data)
        if int(r['status']) != beforeStatus:
            print("STATUS CHANGED TO: ", r['status'])
            beforeStatus = int(r['status'])
            time = time.time() * 1000
            auth = hmac.new(str(math.floor(time/(30*1000))), time + 'POST' + '/sensors' + str(Crypto.Hash.MD5.new(data)))
            requests.post(config['API_URL'], data, headers={'Authorization': auth})