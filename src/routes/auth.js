const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const ValidationError = require('../errors/ValidationError');

const secret = 'Segredo!';

module.exports = (app) => {
  const signin = (req, res, next) => {
    app.services.user
      .findOne({ mail: req.body.mail })
      .then((user) => {
        if (!user) throw new ValidationError('Usuário ou senha inválida');
        if (bcrypt.compareSync(req.body.passwd, user.passwd)) {
          // com esse payload será gerado um token
          const payload = {
            id: user.id,
            name: user.name,
            mail: user.mail,
          };
          // recebe um objeto para criar o token e um segredo
          const token = jwt.encode(payload, secret);
          res.status(200).json({ token });
        } else throw new ValidationError('Usuário ou senha inválida');
      })
      .catch((err) => next(err));
  };

  return { signin };
};
