const express = require('express');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const ValidationError = require('../errors/ValidationError');

const secret = 'Segredo!';

module.exports = (app) => {
  const router = express.Router();

  router.post('/signin', (req, res, next) => {
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
  });

  router.post('/signup', async (req, res, next) => {
    try {
      const user = await app.services.user.save(req.body);
      // Pode-se inserir mais de um registro de uma vez através do knex
      // Insere e retorna um array com tudo (*) que foi inserido, por ser postgre ele retorna os dados
      // MySQL, por exemplo, não funcionaria pois ele não possui return
      // Por estarmos retornando apenas um dado dentro do array, podemos desestruturar

      return res.status(201).json(user[0]);
    } catch (err) {
      next(err);
    }
  });

  return router;
};
