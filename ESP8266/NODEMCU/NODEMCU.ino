#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <FS.h>

// Wi-Fi

const char* ssid  = "";
const char* password = "";

IPAddress ip(192, 168, 0, 150);
IPAddress subnet(255, 255, 255, 0);
IPAddress gateway(192, 168, 0, 1);

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

  server.on("/gate", HTTP_GET, handleGateIndex);

  server.on("/gate", HTTP_POST, handleGateCreate);

  server.onNotFound(handleNotFound);

  server.begin();
}

void sinalize(){
  digitalWrite(builtInLed, LOW);
}

// Functions of web-server

void handleRoot(){
  return server.send(200, "text/html", indexFile);
}

void handleGateIndex(){
  if(!isAuthenticated()) {
    return server.send(401);  // Not authenticated
  }

  return server.send(200, "application/json", gateInfos);
}

void handleGateCreate(){
  if (!isAuthenticated()) {
    return server.send(401);  // Not authenticated

  } else if (!server.hasArg("gate") || !isDigit(server.arg("gate").charAt(0))) {
    return server.send(400);  // Bad Request

  } else if (!gateExists()) {
    return server.send(404);  // Gate does not exist

  }

  gateSignal();
  return server.send(204);  // Sign executed
}

void handleNotFound(){
  return server.send(404, "text/plain", "404");
}

// Functions

bool isAuthenticated(){
  const String authorization = server.header("Authorization");

  if (authorization == passwordGate){
    return true;
  }

  return false;
}

bool gateExists(){
  const int gateID = server.arg("gate").toInt();

  for (int i = 0; i < nog; i++){
    if (gates[i] == gateID) {
      return true;
    }
  }

  return false;
}

void gateSignal(){
  const int gate = server.arg("gate").toInt();

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
