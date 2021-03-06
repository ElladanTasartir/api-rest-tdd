const ValidationError = require('../errors/ValidationError');

module.exports = (app) => {
  const findAll = (id) => {
    return app.db('accounts').where({ user_id: id });
  };

  const find = (filter) => {
    return app.db('accounts').where(filter).first();
    // quer o primeiro resultado encontrado
  };

  const save = async (account) => {
    if (!account.name)
      throw new ValidationError('Nome é um atributo obrigatório');

    const accDb = await find({ name: account.name, user_id: account.user_id });
    if (accDb) throw new ValidationError('Já existe uma conta com este nome');

    return app.db('accounts').insert(account, '*');
  };

  const update = (id, account) => {
    return app.db('accounts').where({ id }).update(account, '*');
  };

  const remove = (id) => {
    return app.db('accounts').where({ id }).del();
  };

  return { save, findAll, find, update, remove };
};
