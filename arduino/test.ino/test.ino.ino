String datos;
#include <SoftwareSerial.h>


#define RX 3  
#define TX 2 
#define ST 6
#define GPS_RST 8
#define PWK 7  //pin 7 must be sett HIGH in order to power on the module POWERKEY ON


SoftwareSerial GPS(TX, RX);

void setup() {
  Serial.begin(9600);
  GPS.begin(9600);
  pinMode(PWK, OUTPUT);
  digitalWrite(PWK, HIGH);
  pinMode(GPS_RST, OUTPUT);
  digitalWrite(GPS_RST, HIGH);
  delay(5000);
  // connect sim
//  GPS.println("AT+COPS=1,0,\"CLARO\"");
// open tcp connection to server
//    GPS.println("AT+QIOPEN=\"TCP\",\"nivelesdeniveles-api.notaroomba.xyz\",3001");
// register for registration
//GPS.print.n("AT+CREG=2");
Serial.println("Talking to Modem: AT");
GPS.println("AT");
delay(1000); 

// I get correct response: OK

Serial.println("Check if SIM is locked");
GPS.println("AT+CPIN?");
delay(1000); 

// I get correct response: +CPIN: READY

Serial.println("Setting up URL");
GPS.println("AT+QHTTPURL=2048,30");
GPS.println("www.google.com");
delay(2000); 

// I get response: OK. Not too sure if the /api/ must be in the URL

Serial.println("Sending Data");
GPS.println("AT+QHTTPGET=31,30,102400");
delay(2000); 

// Get the response: CONNECT

Serial.println("Read Response");
GPS.println("AT+QHTTPREADS=30");
  Serial.println("Open for commands!");
}

void loop(){
  
   if (GPS.available()) {
    Serial.println(GPS.readString());
   }
   if (Serial.available()) {
    GPS.write(Serial.read());
   }
   

}
