const app = require('express')();
const consign = require('consign');
const knex = require('knex');
// const knexLogger = require('knex-logger');
const knexfile = require('../knexfile');

// criada uma chave db para receber os dados do banco
// através do knex() conseguimos inicializar o banco com as opções descritas no knexfile.test
app.db = knex(knexfile.test);

// Vai loggar as consultas no banco enviado no app.db
// Quando não quiser que os logs apareçam, é só comentar
// app.use(knexLogger(app.db));

// vai pedir para o consign pegar o arquivo de middlewares e inserir ele como módulo de app
// consign recebe um objeto de configuração onde podemos falar qual o diretório padrão que o consign vai estar olhando
consign({ cwd: 'src', verbose: false })
  .include('./config/middlewares.js')
  .then('./routes') // para incluir mais arquivos, no caso, incluiremos uma pasta para pegar todos os seus arquivos e ligar ao app
  .then('./config/routes.js')
  .into(app);

app.get('/', (req, res) => {
  res.status(200).send();
});

// Para, caso não seja interessante usar o knex-logger, realizar isso manualmente
// Aqui o app vai estar escutando um evento emitido pelo knex do tipo query
// app.db
//   .on('query', (query) => {
//     console.log({
//       sql: query.sql,
//       bindings: query.bindings ? query.bindings.join(',') : '',
//     });
//   })
//   .on('query-response', (response) => {
//     console.log(response);
//   })
//   .on('error', (error) => {
//     console.log(error);
//   });

module.exports = app;
