#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <FS.h>

// Wi-Fi

const char* ssid  = "";
const char* password = "";

IPAddress ip(192,168,0,90);
IPAddress subnet(255,255,255,0);
IPAddress gateway(192,168,0,1);

// Gates & Pins

const String passwordGate = "123abc";  // Authorization

const int nog = 8; // Number of Gates

const int builtInLed = 2; // D4
const int gates[nog] = {16, 5, 4, 0, 14, 12, 13, 15}; // Pins

// Web Server

String gateInfos;
String indexFile;

ESP8266WebServer server(80);

// --------- ESP initialization --------- End of default configuration ---------

void readFiles(){
  SPIFFS.begin();

  if(SPIFFS.exists("/gates.json")){
    File rGates = SPIFFS.open("/gates.json", "r");
    gateInfos = rGates.readString();
    rGates.close();
  } else {
    gateInfos = "Could not find gates.json";
  }

  if(SPIFFS.exists("/index.html")){
    File rIndex = SPIFFS.open("/index.html", "r");
    indexFile = rIndex.readString();
    rIndex.close();
  } else {
    indexFile = "Could not find index.html";
  } 

  SPIFFS.end();
}

void initializePins(){
  pinMode(builtInLed, OUTPUT);
  digitalWrite(builtInLed, HIGH);

  for (int i = 0; i < nog; i++) {
    pinMode(gates[i], OUTPUT);
    digitalWrite(gates[i], HIGH);
  }
}

void initializeWiFi(){
  WiFi.mode(WIFI_STA);
  WiFi.config(ip, gateway, subnet);
  WiFi.begin(ssid, password);

  while(WiFi.status() != WL_CONNECTED) {
    digitalWrite(builtInLed, LOW);
    delay(250);
    digitalWrite(builtInLed, HIGH);
    delay(250);
  }
}

void initializeWebServer(){
  server.on("/", HTTP_GET, handleRoot);

  server.on("/gate", HTTP_GET, handleGateGET);

  server.on("/gate", HTTP_POST, handleGatePOST);

  server.onNotFound(handleNotFound);

  server.begin();
}

void sinalize(){
  digitalWrite(builtInLed, LOW);
}

// Functions of web-server

void handleRoot(){
  server.send(200, "text/html", indexFile);
}

void handleGateGET(){
  server.send(200, "application/json", gateInfos);
}

void handleGatePOST(){

  if (!isAuthenticated(server.header("Authorization"))) {
    server.send(401);  // Not authenticated
    return;

  } else if (!server.hasArg("gate") || !isDigit(server.arg("gate").charAt(0))) {
    server.send(400);  // Bad Request
    return;

  } else if (!gateExists(server.arg("gate").toInt())) {
    server.send(404);  // Gate does not exist
    return;

  } else {
    server.send(204);  // Sign executed
  }

  gateSignal(server.arg("gate").toInt());
}

void handleNotFound(){
  server.send(404, "text/plain", "404");
}

// Functions

bool isAuthenticated(String pw){
  if (pw == passwordGate){
    return true;
  }
  return false;
}

bool gateExists(int gateID){
  for (int i = 0; i < nog; i++){
    if (gates[i] == gateID) {
      return true;
    }
  }
  return false;
}

void gateSignal(int gate){
  digitalWrite(gate, LOW);
  delay(200);
  digitalWrite(gate, HIGH);
}

// Functions default

void setup() {
  readFiles();
  initializePins();
  initializeWiFi();
  initializeWebServer();
  sinalize();
}

void loop() {
  server.handleClient();
}
