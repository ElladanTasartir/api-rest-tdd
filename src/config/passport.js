const passport = require('passport');
const passportJwt = require('passport-jwt');

const secret = 'Segredo!';

// Estratégia a ser utilizada, ExtractJwt
// vai extrair o token quando o login é realizado
const { Strategy, ExtractJwt } = passportJwt;

module.exports = (app) => {
  const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const strategy = new Strategy(params, (payload, done) => {
    // o done é autoexplicativo e é utilizado quando o processo for finalizado
    app.services.user
      .findOne({ id: payload.id })
      .then((user) => {
        if (user) done(null, { ...payload });
        else done(null, false); // dizendo que não encontrou o usuário
        // primeiro parâmetro é um erro, já que nessa condição
        // não há erro se o usuário for achado, enviamos null
      })
      .catch((err) => done(err, false));
  });

  passport.use(strategy);

  return {
    // Executa o método de autenticação, utilizando a estratégia definiada
    // Em específico falando que quer usar o jwt e que não quer criar sessões
    authenticate: () => passport.authenticate('jwt', { session: false }),
  };
};
