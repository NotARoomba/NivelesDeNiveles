#include <SoftwareSerial.h>
//#include <TinyGPS.h>

enum STATUS {
  SAFE,
  RISK,
  DANGER
};

enum TYPE {
  FLOOD,
  FIRE,
  AVALANCHE
};


#define TRIGGER_PIN 4
#define ECHO_PIN 5
#define RST_GPS 0
#define SENSOR_TYPE 0
#define MAX_ULTRASONIC_DISTANCE 24
#define ULTRASONIC_STATUS_DISTANCE (MAX_ULTRASONIC_DISTANCE / 3)
#define PAST_DISTANCES_SIZE 30

#define SENROR_TYPE FLOOD
#define NAME "W-01"
//const long COORDINATES[] =  {-74.8170327L, 10.991287L};

STATUS status = SAFE;
long pastDistances[PAST_DISTANCES_SIZE];


// TinyGPS gps;
// long lat, lon;
// SoftwareSerial gpsSerial(2, 3);

void setup()
{
  Serial.begin(9600);
  pinMode(TRIGGER_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  // gpsSerial.begin(9600);
  // pinMode(RST_GPS, OUTPUT);
  // digitalWrite(RST_GPS, HIGH);
}

void loop()
{
  // clear trigger
  digitalWrite(TRIGGER_PIN, LOW);
  delayMicroseconds(2);
  // tell sensor to send sound stuff
  digitalWrite(TRIGGER_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIGGER_PIN, LOW);
  // read echo data
  float duration = pulseIn(ECHO_PIN, HIGH);
  float distance = duration*0.034/2;
  
  // VERY IMPORTANT CHECK FOR BIRDS - DONT DELETE
  int distanceArrLength = 0;
  for (int i = 0; i < PAST_DISTANCES_SIZE; i++) {
    if (pastDistances[i] != 0) distanceArrLength++;
  }
  
  if (distanceArrLength == PAST_DISTANCES_SIZE) {
    for (int i = 0; i < PAST_DISTANCES_SIZE-1; i++) {
      pastDistances[i] = pastDistances[i + 1];
    }
    pastDistances[PAST_DISTANCES_SIZE-1] = distance;
  } else {
    pastDistances[distanceArrLength] = distance;
  };
  
  // VERY IMPORTANTE AVERAGE FOR BIRDS - DONT DELETE
  float averageDistance = 0.0f;
  for (int i = 0; i < PAST_DISTANCES_SIZE; i++) {
    averageDistance += pastDistances[i];
  }
  averageDistance /= PAST_DISTANCES_SIZE;
  
  
  if (averageDistance > (ULTRASONIC_STATUS_DISTANCE * 2) || distanceArrLength != PAST_DISTANCES_SIZE) {
    status = SAFE;
  } else if(averageDistance > ULTRASONIC_STATUS_DISTANCE) {
    status = RISK;
  } else {
    status = DANGER;
  }
//
//  Serial.println(gpsSerial.available());

  // if (gpsSerial.available()) {
  //   Serial.write(gpsSerial.read());
  // }
  // if (Serial.available()) {
  //   gpsSerial.write(Serial.read());
  // }
  
//  Serial.print("Distance: ");
//  Serial.println(distance);
//  Serial.print("Status: ");
//  Serial.println(status);
//  Serial.print("Average Distanve: ");
//  Serial.println(averageDistance);

  Serial.print("{\"name\": \"");
  Serial.print(NAME);
  Serial.print("\", \"status\": ");
  Serial.print(status);
  Serial.print(", \"type\": ");
  Serial.print(SENSOR_TYPE);
  Serial.print(", \"location\": {\"type\": \"Point\", \"coordinates\": [");
  Serial.print("-74.1048099081874");
  Serial.print(", ");
  Serial.print("4.641750451571789");
  Serial.println("]}}");
  
  delay(10);
}
