//ultrasonic sensor constansts
const int trigPin = 9;
const int echoPin = 8;
//ultrasonic sensor variables
long duracion;
long distancia;
int nivel;
//testing
long latitudefixed = 11.020311;
long longitudefixed = -74.8503638;

//initial configuration
void setup() {
  //ultrasonic sensor pinout
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  //console configuration
  Serial.begin(9600);
}

//main loop
void loop() {
  //ultrasonic sensor enabling
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  //ultrasonic sensor time measurement
  duracion = pulseIn(echoPin, HIGH);
  distancia = duracion * 0.034 / 2;

  //ESTA LÍNEA NO SE SI ES NECESARIA
  //distancia = distancia;
  //Serial.print("Distancia: ");
  //Serial.println(distancia);

  //output the level
  nivel = 20 - distancia;
  Serial.print("Nivel: ");
  Serial.println(nivel);
  delay(300);

  //test if the level is safe
  if (nivel == 15 or nivel > 15) {
    Serial.println("Peligro");
    delay(100);
  }  
  else if (nivel > 10 and nivel < 15) {
    Serial.println("En riesgo");
    delay(100);
  }
  else if (nivel < 10 or nivel == 10){
    Serial.println("Seguro");
    delay(100);
  }

  //output location
  Serial.print("Location: ");
  Serial.print(latitudefixed);
  Serial.print(",");
  Serial.println(longitudefixed);

}
