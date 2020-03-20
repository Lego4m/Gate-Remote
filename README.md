# Gate-Remote

Esse projeto usa o esp8266 para abrir portões.

## Começando

### Pré requisitos

* Arduino IDE ([Com suporte a ESP8266](http://autocorerobotica.blog.br/aprenda-configurar-ide-arduino-para-familia-esp8266/))
* Ferramenta [ESP8266 sketch Data Upload](https://github.com/esp8266/arduino-esp8266fs-plugin/releases)
* ESP8266
* Módulo de relé

### Instalando

#### ESP8266

Abra o sketch referente a sua placa em [ESP8266](ESP8266)

* Mude a linha 5 e 6 para o nome e senha de sua rede WiFi;
* Mude a linha 7 para a senha que será utilizada para autenticação;
* Mude a linha 9, 10, 11 para as configurações de IP;
***

Copie os arquivos [index.html e gates.json](Frontend/web) para dentro de "ESP8266/suaplaca/data".

* Altere os nomes dos portões dentro de gates.json
* Use a ferramenta ESP8266 sketch Data Upload;
* Logo após, grave o sketch no seu ESP8266;
***

#### Mobile

O aplicativo é construído com o EXPO.

Execute ```npm install .``` e depois ```npm start``` para iniciar o aplicativo.

<img src="preview/home.png" alt="preview home" height="400" width="184"/> <img src="preview/settings.png" alt="preview settings" height="400" width="184"/>
