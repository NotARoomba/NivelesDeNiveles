
int led = 13;
int onModulePin = 2;        // the pin to switch on the module (without press on button) 

int timesToSend = 5;        // Numbers of SMS to send
int count = 0;

char phone_number[]="+573104250018";     // ********* is the number to call

void switchModule(){
    digitalWrite(onModulePin,HIGH);
    delay(2000);
    digitalWrite(onModulePin,LOW);
}


void setup(){

    Serial.begin(115200);                // UART baud rate
    delay(2000);
    pinMode(led, OUTPUT);
    pinMode(onModulePin, OUTPUT);
    switchModule();                    // switches the module ON

    for (int i=0;i < 5;i++){
        delay(5000);
    } 

    Serial.println("AT+CMGF=1");         // sets the SMS mode to text
    delay(100);
//    Serial.println("AT+CSCA=\"+573016561360\"");         // sets the SMS mode to text
//    delay(100);
    
}

void loop(){

    while (count < timesToSend){
        delay(1500);
        Serial.print("AT+CMGS=\"");     // send the SMS number
        Serial.print(phone_number);
    Serial.println("\"");
    delay(200);    
        Serial.print("Hola caracola...");     // the SMS body
        delay(500);
        Serial.print(char(26)); 
//        Serial.write(0x1A);       //sends ++
//        Serial.write(0x0D);
//        Serial.write(0x0A);
//          sendGetRequest();

        delay(5000);

        count++;
    }

}
void sendCommand(const char* command) {
  Serial.println(command);
  delay(200);
  ShowSerialData();
}

void ShowSerialData() {
  Serial.println("Show serial data:");
  while (Serial.available()) {
    char c = Serial.read();
    Serial.write(c);
  }
  Serial.println("");
  delay(1000);
}
void testPostRequest(String jsonToSend){
  //Example format of JSON:
  // String jsonToSend="{\"uploadedAt\":\"2023-06-26T20:18:22.826Z\",\"data\":[{\"unit\":\"C\",\"reading\":31}]}";
  

  sendCommand("AT");
  ShowSerialData();
  sendCommand("AT+CIPSHUT");
  ShowSerialData();
  delay(500);
  sendCommand("AT+SAPBR=0,1");
  delay(2000);
  
  ShowSerialData();
  sendCommand("AT+SAPBR=3,1,\"Contype\",\"GPRS\"");
  ShowSerialData();
  sendCommand("AT+SAPBR=3,1,\"APN\",\"internet.apn\"");
  ShowSerialData();
  sendCommand("AT+SAPBR=1,1");
  delay(2000);
  ShowSerialData();
  sendCommand("AT+HTTPINIT");
  delay(1000);
  ShowSerialData();
  sendCommand("AT+HTTPPARA=\"CID\",1");
  ShowSerialData();
  sendCommand("AT+HTTPPARA=\"URL\",\"http://example.com/data\"");
  ShowSerialData();
  sendCommand("AT+HTTPPARA=\"CONTENT\",\"application/json\"");
  ShowSerialData();
  sendCommand(("AT+HTTPDATA=" + String(jsonToSend.length()) + ",20000").c_str());
  delay(6000);
  Serial.println(jsonToSend);
  delay(16000);
  ShowSerialData();
  sendCommand("AT+HTTPACTION=1");
  delay(20000);
  ShowSerialData();
  sendCommand("AT+HTTPREAD");
  ShowSerialData();
  sendCommand("AT+HTTPTERM");
  ShowSerialData();
  sendCommand("AT+CIPSHUT");
  ShowSerialData();
}
void sendGetRequest(){

  //Check if the module is responsive, expected value OK
  sendCommand("AT"); 
  //close or turn off network connection in case it was left open, expected value OK
  sendCommand("AT+CIPSHUT"); 
  // close GPRS context bearer in case it was left open, expected value OK
  sendCommand("AT+SAPBR=0,1"); 
  // open GPRS context establish GPRS connection
  sendCommand("AT+SAPBR=3,1,\"Contype\",\"GPRS\"");
  //Set the Access Point Name (APN) for the network provider
  //change this apn value for your SIM card
  sendCommand("AT+SAPBR=3,1,\"APN\",\"internet.mtn\"");
  //open GPRS context bearer
  sendCommand("AT+SAPBR=1,1");
  //initiate HTTP request
  sendCommand("AT+HTTPINIT");
  //set parameters for http session, HTTP context identifier
  sendCommand("AT+HTTPPARA=\"CID\",1");
   //Change the URL from google.com to the server you want to reach
  sendCommand("AT+HTTPPARA=\"URL\",\"http://example.com/\"");
  //Initiate the HTTP GET request, send http request to specified URL
  sendCommand("AT+HTTPACTION=0");
  // Wait for the response (adjust the delay as needed)
  delay(9000); 
  // Read the HTTP response, normally contains status code 200 if successful
  sendCommand("AT+HTTPREAD");
  //Terminate the HTTP service
  sendCommand("AT+HTTPTERM");
  //close or turn off network connection
  sendCommand("AT+CIPSHUT");
  // close GPRS context bearer
  sendCommand("AT+SAPBR=0,1");
  

}
