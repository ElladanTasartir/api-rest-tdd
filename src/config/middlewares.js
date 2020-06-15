const bodyParser = require('body-parser');
// const knexLogger = require('knex-logger');

module.exports = (app) => {
  app.use(bodyParser.json());
  // Vai loggar as consultas no banco enviado no app.db
  // Quando não quiser que os logs apareçam, é só comentar
  // app.use(knexLogger(app.db));
};
