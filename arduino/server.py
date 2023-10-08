import binascii
from datetime import datetime
import serial
import time
import json
import hmac, math, requests, hashlib, os
from dotenv import dotenv_values
if os.name =='nt':
  port = 'COM5'
else:
  port = '/dev/ttyACM0'

config = dotenv_values(".env")
arduino = serial.Serial(port=port, baudrate=9600, timeout=.1)
beforeStatus = 0
def is_json(myjson):
  try:
    json.loads(myjson)
  except ValueError as e:
    return False
  return True
def md5(data):
    m = hashlib.md5()
    m.update(data)
    return m.hexdigest()

while True:
    data = arduino.readline().strip().decode('utf-8').strip()
    if (is_json(data)):
        r = json.loads(data)
        print(r)
        if int(r['status']) != beforeStatus:
            print("STATUS CHANGED TO: ", r['status'])
            beforeStatus = int(r['status'])
            ct = math.floor(time.time() * 1000)
            print(ct)
            auth = hmac.new(key=str(math.floor(ct/(30*1000))).encode(), digestmod=hashlib.sha256)
            auth.update(str(ct).encode())
            auth.update('POST'.encode())
            auth.update('/sensors'.encode())
            auth.update(md5(data.encode()).encode())
            print('HMAC ' + str(ct) + ':' + auth.hexdigest(), config['API_URL'] + '/sensors')
            res = requests.post(config['API_URL'] + '/sensors', data, headers={'Authorization': ('HMAC ' + str(ct) + ':' + auth.hexdigest()), 'Accept': 'application/json',
              'Content-Type': 'application/json',})
            print(res)