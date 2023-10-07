import serial
import time
import json 
from Crypto.Hash import MD5
import hmac, math, requests, hashlib
from dotenv import dotenv_values


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
        print(r)
        if int(r['status']) != beforeStatus:
            print("STATUS CHANGED TO: ", r['status'])
            beforeStatus = int(r['status'])
            ct = time.time() * 1000
            auth = hmac.new(bytearray(math.floor(ct/(30*1000))), bytearray(str(ct) + 'POST' + '/sensors' + MD5.new(bytearray(data, 'utf-8')).hexdigest(), 'utf-8'), digestmod=hashlib.sha256)
            # auth.update(ct)
            # auth.update('POST')
            # auth.update('/sensors')
            # auth.update(MD5.new(bytearray(data, 'utf-8')).hexdigest())
            print(auth.hexdigest())
            res = requests.post(config['API_URL'], data, headers={'Authorization': 'HMAC ' + str(ct) + ':' + auth.hexdigest()})
            print(res)