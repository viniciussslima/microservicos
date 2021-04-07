# SPRUCE

Projeto da diciplina DIM0532 - TÓPICOS ESPECIAIS EM ENGENHARIA DE SOFTWARE II

## Alunos:

- Fagner Morais Dias
- Hudson Bruno Macedo Alves
- Vinicius Santos Silva de Lima

## Descrição

O projeto consiste na migração de um sistema monólito para um sistema de micro serviços.

O sistema escolhido para fazer a migração é o <a href="https://github.com/littledivy/spruce"> Spruce </a>.

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

## Front-end

Para executar o front-end utilize o comando abaixo dentro do diretório webapp:

```bash
$ npm install
$ npm start
```

## Versão online

<a href="https://spruce-viniciussslima.vercel.app"> https://spruce-viniciussslima.vercel.app/</a>
