#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <FS.h>

const char* ssid  = "";
const char* password = "";
const String passwordGate = "123abc";
const String gateInfos = "[\"Portão 1\", \"Portão 2\", \"Portão 3\", \"Portão 4\", \"Portão 5\", \"Portão 6\", \"Portão 7\", \"Portão 8\"]";

IPAddress ip(192,168,0,90);
IPAddress subnet(255,255,255,0);
IPAddress gateway(192,168,0,1);

String indexFile;

ESP8266WebServer server(80);

const int builtInLed = 2; //D4
const int gate1 = 16;     //D0
const int gate2 = 5;      //D1
const int gate3 = 4;      //D2
const int gate4 = 0;      //D3
const int gate5 = 14;     //D5
const int gate6 = 12;     //D6
const int gate7 = 13;     //D7
const int gate8 = 15;     //D8

// ======================================== Inicialização do ESP

void readFiles(){
  SPIFFS.begin();

  if(SPIFFS.exists("/index.html")){
    File rIndex = SPIFFS.open("/index.html", "r");
    indexFile = rIndex.readString();
    rIndex.close();
    Serial.println("index.html encontrado");

  } else {
    Serial.println("index.html nao encontrado");

  } 

  SPIFFS.end();
}

void initializePins(){
  pinMode(builtInLed, OUTPUT);
  pinMode(gate1, OUTPUT);
  pinMode(gate2, OUTPUT);
  pinMode(gate3, OUTPUT);
  pinMode(gate4, OUTPUT);
  pinMode(gate5, OUTPUT);
  pinMode(gate6, OUTPUT);
  pinMode(gate7, OUTPUT);
  pinMode(gate8, OUTPUT);
  digitalWrite(builtInLed, HIGH);
  digitalWrite(gate1, HIGH);
  digitalWrite(gate2, HIGH);
  digitalWrite(gate3, HIGH);
  digitalWrite(gate4, HIGH);
  digitalWrite(gate5, HIGH);
  digitalWrite(gate6, HIGH);
  digitalWrite(gate7, HIGH);
  digitalWrite(gate8, HIGH);

  Serial.println("Pinos iniciados");
}

void initializeWiFi(){
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  WiFi.config(ip, gateway, subnet);

  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("Conectado na rede: ");
  Serial.println(WiFi.SSID());
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

void initializeWebServer(){
  server.on("/", HTTP_GET, handleRoot);

  server.on("/gateInfos", HTTP_GET, handleGateInfos);

  server.on("/gate", HTTP_POST, handleGate);

  server.onNotFound(handleNotFound);

  server.begin();

  Serial.println("Server iniciado");
}

void sinalize(){
  for (int i = 0; i < 2; i++){
    digitalWrite(builtInLed, LOW);
    delay(1000);
    digitalWrite(builtInLed, HIGH);
    delay(1000);
  }
}

// ======================================== Funções do servidor

void handleRoot(){
  server.send(200, "text/html", indexFile);
}

void handleGateInfos(){
  server.send(200, "application/json", gateInfos);
}

void handleGate(){

/*
  * 0 - Não autorizado
  * 1 - Portão não existe
  * 2 - Sinal feito
*/

  if (!isAuthenticated(server.arg("pw"))){
    server.send(401, "text/plain", "0");  // Não autenticado
    return;

  } else if (!gateExists(server.arg("gate").toInt())) {
    server.send(404, "text/plain", "1");  // Portão não existe
    return;

  } else {
    server.send(200, "text/plain", "2");  // Sinal feito
  }

  switch(server.arg("gate").toInt()){
    case 1:
      gateSignal(gate1);
      break;

    case 2:
      gateSignal(gate2);
      break;

    case 3:
      gateSignal(gate3);
      break;

    case 4:
      gateSignal(gate4);
      break;

    case 5:
      gateSignal(gate5);
      break;

    case 6:
      gateSignal(gate6);
      break;

    case 7:
      gateSignal(gate7);
      break;

    case 8:
      gateSignal(gate8);
      break;
  }
}

void handleNotFound(){
  server.send(404, "text/plain", "Pagina nao encontrada");
}

// ======================================== Funções

void gateSignal(int gate){
  digitalWrite(gate, LOW);
  delay(200);
  digitalWrite(gate, HIGH);
}

bool isAuthenticated(String pw){
  if (pw == passwordGate){
    return true;
  } else {
    return false;
  }
}

bool gateExists(int gateID){
  if (gateID >= 1 && gateID <= 8){
    return true;
  } else {
    return false;
  }
}

// ======================================== Funções ESP

void setup() {
  Serial.begin(9600);
  readFiles();
  initializePins();
  initializeWiFi();
  initializeWebServer();
  sinalize();
}

void loop() {
  server.handleClient();
}
