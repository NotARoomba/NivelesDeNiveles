String datos;
#include <SoftwareSerial.h>
#include <TinyGPS++.h>

SoftwareSerial GPS(3, 2);

#define RX 3  //Define A4 as RX
#define TX 2  //Define A5 as TX
#define PWK 7  //pin 8 must be sett HIGH in order to power on the module POWERKEY ON
#define ENABLE 0  //pin 10 must be HIGH in order to communicate with M95
char text[150];   
String message="";
int i;
   

void setup() {
  Serial.begin(9600);
  GPS.begin(9600);
  pinMode(PWK, OUTPUT);
  pinMode(ENABLE, OUTPUT);
  digitalWrite(PWK, HIGH);
  digitalWrite(ENABLE, HIGH);
  
  while(!Serial){  //waiting for Serial to be TRUE
    ;
  }
  Serial.println("Serial communikation is open");
  
  GPS.begin(57600);
  delay(10);
  Serial.println("Serial com via M95 is now opend!");
  delay(5000);
  GPS.println("AT+CNMI=1,2,0,0,0"); // Decides how newly arrived SMS messages should be handled

  Serial.println("Write your SMS:"); 
  
}

void loop(){   

i=0;   
while( Serial.available()>0 ){     
 text[i] = Serial.read();   
 message += text[i];   
 i++;   
 if (text[i-1]==10){  
  Serial.println("Send SMS......");  
  SendTextMessage();  
  ShowSerialData();  
  delay(1000);   
  Serial.println("Success");   
  message="";  
  i=0;  }}
  ShowSerialData();  
  delay(1000);
}  


void SendTextMessage(){ 
  
GPS.print("AT+CMGF=1\r"); 
delay(1000);  
GPS.print("AT+CMGS=\"+573104250018\"\r");  //Change this number to landcode+phone
delay(1000);  
GPS.println(message);  
GPS.print("\r");  
delay(1000);  
GPS.write(26);  
 }  


void ShowSerialData(){  

while(GPS.available()!=0)  
 Serial.write(GPS.read());}
