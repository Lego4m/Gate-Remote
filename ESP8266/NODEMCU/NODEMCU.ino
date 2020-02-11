#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <FS.h>

const char* ssid  = "";
const char* password = "";
const String passwordGate = "123abc";

IPAddress ip(192,168,0,90);
IPAddress subnet(255,255,255,0);
IPAddress gateway(192,168,0,1);

String indexFile;

ESP8266WebServer server(80);

const int ledInterno = 2; //D4
const int portao1 = 16;   //D0
const int portao2 = 5;    //D1

// ======================================== Inicialização do ESP

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

  // Rotas

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

// ======================================== Funções do servidor

void handleRoot(){
  server.send(200, "text/html", indexFile);
}

void handleGate(){

/*
  * 0 - Não autorizado
  * 1 - Portão não existe
  * 2 - Sinal feito
*/

  if (!autenticar()){
    server.send(200, "text/plain", "0");
    return;
  }

    int gateState = 2;

    switch(server.arg("portao").toInt()){
      case 1:
        gateSignal(portao1);
        break;

      case 2:
        gateSignal(portao2);
        break;

      default: 
        gateState = 1;
        break;
    }

    server.send(200, "text/plain", String(gateState));
    Serial.println(gateState);
}

void handleNotFound(){
  server.send(404, "text/plain", "Pagina nao encontrada");
}

// ======================================== Funções

void avisaDesconexao(){
  if (WiFi.status() != WL_CONNECTED){
    Serial.println("Conexão perdida!");

    while (WiFi.status() != WL_CONNECTED){
      delay(2000);
      Serial.print(".");
    }

    Serial.println("");
    Serial.println("Conexão restabelecida");
  }
}

void gateSignal(int gate){
  digitalWrite(gate, LOW);
  delay(300);
  digitalWrite(gate, HIGH);
}

bool autenticar(){
  if (server.arg("pw") == passwordGate){
    return true;
  } else {
    return false;
  }
}

// ======================================== Funções ESP

void setup() {
  Serial.begin(9600);
  inicializaPinos();
  lerArquivos();
  inicializaWifi();
  sinalizarLed();
}

void loop() {
  server.handleClient();
  avisaDesconexao();
}
