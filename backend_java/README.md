# API Back End - REST API Spring

---

## Requisitos

* Git
* Docker 
* Java JDK 11 
* IDEA para dev JAVA: Recomendo usar o IntelliJ IDEA Communnity Edition, mas pode ser o Eclipse ou NetBeans
* MongoDB Compass

## Como rodar nosso BE (backend) Passo a Passo

Nota: O backend deve ser executado ANTES do frontend 

1. Abrir nem uma IDEA a pasta PROJETO-MC426/backend que contem a API JAVA

2. Executar no terminal ( em PROJETO-MC426/backend), os seguintes comandos:

`docker rm -f $(docker ps -a -q)`

`docker-compose -f docker-compose.yml up`

3. Executar a classe BackendApplication.java que está em backend/src/main/java/com/example/backend/BackendApplication.java

4. No MongoDB Compass, use a URL: `mongodb://localhost:27017/?directConnection=true`.
Foi criado um database BackendDB, com as collections de Client e Company

5. Aceesse a url: `http://localhost:8082/swagger-ui/index.html` para ver a documentação da API. Obs: vc pode testar criando e retornando dados tbm.

6. Agora, basta subir o frontend, seguindo o outro README

