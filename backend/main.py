import serial
import time
arduino = serial.Serial(port='/dev/ttyACM0', baudrate=9600, timeout=.1)
def read():
    data = arduino.readline()
    return data
while True:
    r = read()
    if len(r)>=3:
        print(r) # printing the value