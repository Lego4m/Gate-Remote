#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

const char* ssid  = "Maron";
const char* password = "grmaron2";

ESP8266WebServer server(80);

const int portao1 = 16; //D0
const int portao2 = 5; //D1

void inicializaPinos(){
  pinMode(portao1, OUTPUT);
  pinMode(portao2, OUTPUT);
  digitalWrite(portao1, HIGH);
  digitalWrite(portao2, HIGH);
  Serial.println("Pinos iniciados");
}

void inicializaWifi(){
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("Conectado na rede: ");
  Serial.println(ssid);
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());

  server.on("/gate", handleGate);

  server.onNotFound(handleNotFound);

  server.begin();
  Serial.println("Server iniciado");
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
  inicializaWifi();
}

void loop() {
  server.handleClient();
  mantemConexoes();
}
