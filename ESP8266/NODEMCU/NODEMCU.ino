#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <FS.h>

const char* ssid  = "";
const char* password = "";

IPAddress ip(192,168,0,90);
IPAddress subnet(255,255,255,0);
IPAddress gateway(192,168,0,1);

String indexFile;

ESP8266WebServer server(80);

const int ledInterno = 2; //D4
const int portao1 = 16; //D0
const int portao2 = 5; //D1

void inicializaPinos(){
  pinMode(ledInterno, OUTPUT);
  pinMode(portao1, OUTPUT);
  pinMode(portao2, OUTPUT);
  digitalWrite(ledInterno, HIGH);
  digitalWrite(portao1, HIGH);
  digitalWrite(portao2, HIGH);
  Serial.println("Pinos iniciados");
}

void lerArquivos(){
  SPIFFS.begin();

  if(SPIFFS.exists("/index.html")){
    Serial.println("index.html encontrado");
  } else {
    Serial.println("index.html nao encontrado");
  }

  File rIndex = SPIFFS.open("/index.html", "r");
  indexFile = rIndex.readString();

  Serial.println("index.html lido");
}

void inicializaWifi(){
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  WiFi.config(ip, gateway, subnet);

  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("Conectado na rede: ");
  Serial.println(ssid);
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);

  server.on("/gate", handleGate);

  server.onNotFound(handleNotFound);

  server.begin();
  Serial.println("Server iniciado");
}

void sinalizarLed(){
  for (int i = 0; i < 2; i++){
    digitalWrite(ledInterno, LOW);
    delay(1000);
    digitalWrite(ledInterno, HIGH);
    delay(1000);
  }
}

void mantemConexoes(){
  if (WiFi.status() != WL_CONNECTED){
    Serial.println("Conexao perdida!");
    while (WiFi.status() != WL_CONNECTED){
      delay(2000);
      Serial.print(".");
    }
    Serial.println("");
    Serial.println("Conexão reestabelecida");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
  }
}

void handleRoot(){
  server.send(200, "text/html", indexFile);
}

void handleGate(){
  if (server.arg("portao") != ""){
    const int numeroPortao = server.arg("portao").toInt();

    String message;

    switch(numeroPortao){
      case 1:
        message = "Sinal no portao 1";
        gateSignal(portao1);
        break;

      case 2:
        message = "Sinal no portao 2";
        gateSignal(portao2);
        break;

      default: 
        message = "Portao nao definido";
        break;
    }
    server.send(200, "text/plain", message);
    Serial.println(message);

  } else {
    server.send(200, "text/plain", "Portao nao especificado");
  }
}

void handleNotFound(){
  server.send(404, "text/plain", "Página não encontrada");
}

void gateSignal(int gate){
  digitalWrite(gate, LOW);
  delay(300);
  digitalWrite(gate, HIGH);
}

void setup() {
  Serial.begin(9600);
  inicializaPinos();
  lerArquivos();
  inicializaWifi();
  sinalizarLed();
}

void loop() {
  server.handleClient();
  mantemConexoes();
}
