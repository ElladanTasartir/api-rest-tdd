<p align="center">
<img src="./assets/REST-TDD.png">
</p>

<h2 align="center">TDD - Test Driven Development 💻</h2>

Esse repositório tem o intuito de servir apenas como base de estudos sobre TDD utilizando de uma API Rest para servir os dados e os testes para validar esses dados.

###### Jest: Framework de testes

Após instalar a dependência de desenvolvimento jest através de:

`yarn add jest -D`

ou

`npm i jest -D`

É possível realizar uma série de testes utilizando esse framework, mas por enquanto, apenas mais básicos e para exemplo serão feitos.
Os testes podem ser encontrados na pasta teste com alguns comentários explicando alguns conceitos básicos do jest.

###### Nesse repositório foi utilizado o Postgres como base de dados e o KnexJS como Query builder

Para criação de migrations foi utilizado o comando:

`npx knex migrate:make nome_migration --env test`

Para a execução das migrations:

`npx knex migrate:latest --env test`

- O latest significa que ele executará a versão das migrations mais recentes

Para o rollback:

`npx knex migrate:rollback --env test`

###### Instalada uma lib para realizar os logs do banco de dados chamada knex-logger

É uma lib bem desatualizada, funciona bem, mas pela falta de suporte pode não ser tão interessante assim tê-la no projeto.

Utiliza um middleware para loggar as querys realizadas dentro do banco pelo Knex.
