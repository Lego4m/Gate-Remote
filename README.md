# ESP8266 Gate solo

Esse projeto usa apenas um ESP8266 para abrir portões.

## Começando

### Pré requisitos

* Arduino IDE (Com suporte a ESP8266, se você não sabe como, [clique Aqui](http://autocorerobotica.blog.br/aprenda-configurar-ide-arduino-para-familia-esp8266/))
* Ferramenta [ESP8266 sketch Data Upload](https://github.com/esp8266/arduino-esp8266fs-plugin/releases)
* ESP8266
* Módulo de relé

### Instalando

#### ESP8266

Abra o sketch referente a sua placa em ESP8266/

* Mude a linha 5 e 6 para o nome e senha de sua rede WiFi;
* Mude a linha 7 para a senha que será utilizada para autenticação;
* Mude a linha 9, 10 e 11 para as configurações de IP;
***

Copie os arquivos index.html e mobile.html (Frotend/templates/) para dentro de ESP8266/suaplaca/data, e edite-os para se adequar à suas necessidades.

Obs: A diferença entre os arquivos index.html e mobile.html é na linha 148.

* Use a ferramenta ESP8266 sketch Data Upload;
* Logo após, grave o sketch no seu ESP8266;
***

#### Mobile

O projeto é construído com o EXPO.

Execute ```npm install .``` e depois ```npm start``` para iniciar o aplicativo.

Note que o IP padrão da WebView (Frontend/mobile/src/pages/Home.js, line 35) é 192.168.0.90

## Autor
| [<img src="https://avatars0.githubusercontent.com/u/39628486?s=460&v=4" width=115><br>](https://github.com/Leogamermmmm) |
| :---: |