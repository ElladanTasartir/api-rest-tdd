const express = require('express');
const AuthError = require('../errors/AuthError');

module.exports = (app) => {
  const router = express.Router();

  router.param('id', (req, res, next) => {
    // Quando este parâmetro "id" for enviado, ele executará esse middleware
    app.services.account
      .find({ id: req.params.id })
      .then((acc) => {
        if (acc.user_id !== req.user.id)
          // Se o id da conta for diferente do id
          // do usuário logado (req.user.id vindo do token)
          throw new AuthError();
        next();
      })
      .catch((err) => next(err));
  });

  router.post('/', (req, res, next) => {
    app.services.account
      .save({ ...req.body, user_id: req.user.id })
      // O passport envia os dados do usuário dentro do request
      .then((result) => {
        return res.status(201).json(result[0]);
      })
      .catch((err) => next(err));
    // Permite que o middleware receba o erro enviado
  });

  router.get('/', (req, res, next) => {
    app.services.account
      .findAll(req.user.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  });

  router.get('/:id', (req, res, next) => {
    app.services.account
      .find({ id: req.params.id })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => next(err));
  });

  router.put('/:id', (req, res, next) => {
    app.services.account
      .update(req.params.id, req.body)
      .then((result) => res.status(200).json(result[0]))
      .catch((err) => next(err));
  });

  router.delete('/:id', (req, res, next) => {
    app.services.account
      .remove(req.params.id)
      .then(() => res.status(204).send())
      .catch((err) => next(err));
  });

  return router;
};
