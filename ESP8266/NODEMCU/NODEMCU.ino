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
String mobileFile;

ESP8266WebServer server(80);

const int ledInterno = 2; //D4
const int portao1 = 16;   //D0
const int portao2 = 5;    //D1
const int portao3 = 4;    //D2
const int portao4 = 0;    //D3
const int portao5 = 14;   //D5
const int portao6 = 12;   //D6
const int portao7 = 13;   //D7
const int portao8 = 15;   //D8

// ======================================== Inicialização do ESP

void inicializaPinos(){
  pinMode(ledInterno, OUTPUT);
  pinMode(portao1, OUTPUT);
  pinMode(portao2, OUTPUT);
  pinMode(portao3, OUTPUT);
  pinMode(portao4, OUTPUT);
  pinMode(portao5, OUTPUT);
  pinMode(portao6, OUTPUT);
  pinMode(portao7, OUTPUT);
  pinMode(portao8, OUTPUT);
  digitalWrite(ledInterno, HIGH);
  digitalWrite(portao1, HIGH);
  digitalWrite(portao2, HIGH);
  digitalWrite(portao3, HIGH);
  digitalWrite(portao4, HIGH);
  digitalWrite(portao5, HIGH);
  digitalWrite(portao6, HIGH);
  digitalWrite(portao7, HIGH);
  digitalWrite(portao8, HIGH);

  Serial.println("Pinos iniciados");
}

void lerArquivos(){
  SPIFFS.begin();

  if(SPIFFS.exists("/index.html")){
    File rIndex = SPIFFS.open("/index.html", "r");
    indexFile = rIndex.readString();
    rIndex.close();
    Serial.println("index.html encontrado");

  } else {
    Serial.println("index.html nao encontrado");

  } 

  if (SPIFFS.exists("/mobile.html")){
    File rMobile = SPIFFS.open("/mobile.html", "r");
    mobileFile = rMobile.readString();
    rMobile.close();
    Serial.println("mobile.html encontrado");

  } else {
    Serial.println("mobile.html nao encontrado");
    
  }
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
  Serial.println(WiFi.SSID());
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());

  // Rotas

  server.on("/", handleRoot);

  server.on("/mobile", handleMobile);

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

void handleMobile(){
  server.send(200, "text/html", mobileFile);
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

    case 3:
      gateSignal(portao3);
      break;

    case 4:
      gateSignal(portao4);
      break;

    case 5:
      gateSignal(portao5);
      break;

    case 6:
      gateSignal(portao6);
      break;

    case 7:
      gateSignal(portao7);
      break;

    case 8:
      gateSignal(portao8);
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
