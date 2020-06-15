module.exports = (app) => {
  // O consign permite esse tipo de abstração, pegar e organizar os arquivos dentro de um único objeto, no caso o objeto que demos o into()
  // Únicas rotas desprotegidas de autenticação
  app.route('/auth/signin').post(app.routes.auth.signin);

  // O signup será responsável por realizar a criação desses usuários
  // Então podemos utilizar o método create da rota users
  app.route('/auth/signup').post(app.routes.users.create);

  // O passport é usado como middleware para todas (.all) as rotas
  // e métodos http que queremos proteger por autenticação
  app
    .route('/users')
    .all(app.config.passport.authenticate())
    .get(app.routes.users.findAll)
    .post(app.routes.users.create);
  // quando for feito o get, ele entrará no findAll, post, create
  app
    .route('/accounts')
    .all(app.config.passport.authenticate())
    .get(app.routes.accounts.getAll)
    .post(app.routes.accounts.create);

  app
    .route('/accounts/:id')
    .all(app.config.passport.authenticate())
    .get(app.routes.accounts.get)
    .put(app.routes.accounts.update)
    .delete(app.routes.accounts.remove);
};
