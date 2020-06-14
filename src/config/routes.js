module.exports = (app) => {
  // O consign permite esse tipo de abstração, pegar e organizar os arquivos dentro de um único objeto, no caso o objeto que demos o into()
  app
    .route('/users')
    .get(app.routes.users.findAll)
    .post(app.routes.users.create);
  // quando for feito o get, ele entrará no findAll, post, create
  app.route('/accounts').post(app.routes.accounts.create);
};
