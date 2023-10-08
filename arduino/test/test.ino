#include <SoftwareSerial.h> 

#define RX 2  //Define A4 as RX
#define TX 3  //Define A5 as TX
#define PWK 7  //pin 8 must be sett HIGH in order to power on the module POWERKEY ON
#define ENABLE 8  //pin 10 must be HIGH in order to communicate with M95

char text[150];   
String message="";
int i;
   
SoftwareSerial mySerial(RX,TX);

void setup() {
  pinMode(PWK, OUTPUT);
  pinMode(ENABLE, OUTPUT);

  gsmOn();  //Starta modulen

  Serial.begin(9600);  //Initiate software serial
  while(!Serial){  //waiting for Serial to be TRUE
    ;
  }
  Serial.println("Serial communikation is open");
  
  mySerial.begin(9600);
  delay(10);
  Serial.println("Serial com via M95 is now opend!");
  delay(5000);
  mySerial.println("AT+CNMI=1,2,0,0,0"); // Decides how newly arrived SMS messages should be handled

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
  
mySerial.print("AT+CMGF=1\r"); 
delay(1000);  
// mySerial.print("AT+CSCS=\"GSM\"\r"); 
// delay(2000);  
mySerial.print("AT+CMGS=\"+573104698229\"\r");  //Change this number to landcode+phone
delay(1000);  
mySerial.println(message);  
// mySerial.print("\r");  
delay(1000);  
mySerial.write(26);  
delay(12000); 
 }  


void ShowSerialData(){  

while(mySerial.available()!=0)  
 Serial.write(mySerial.read());}

void gsmOn() {
  digitalWrite(PWK, HIGH);
  digitalWrite(ENABLE, HIGH);
}