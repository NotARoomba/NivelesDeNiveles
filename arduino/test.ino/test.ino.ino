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
