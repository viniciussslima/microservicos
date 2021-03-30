# SPRUCE

## Dependências

Para rodar o projeto é necessário ter um node, npm e mongoDB (ou docker-compose) instalados.

## Docker-compose

Caso queira usar o banco de dados usando docker-compose basta rodar o comando abaixo no diretório docker:

```bash
$ docker-compose up -d
```

## Iniciar os serviços (autenticação, feed e chat)

Cada serviço contem o seu diretório, para roda-los basta rodar os comandos abaixo:

```bash
$ npm install
$ npm run dev
```

## API

Caso esteja em um ambiente WINDOWS para rodar a api utiliza-se:

```bash
$ npm install
$ npm run start:win
```

Caso esteja em um ambiente UNIX utilize:

```bash
$ npm install
$ npm start
```

## Front-end

Para executar o front-end utilize o comando abaixo dentro do diretório webapp:

```bash
$ npm install
$ npm start
```
