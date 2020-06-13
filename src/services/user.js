module.exports = (app) => {
  const findAll = () => {
    return app.db('users').select(); // vai retornar a promise
  };

  const save = (user) => {
    if (!user.name) return { error: 'Nome é um atributo obrigatório' };
    return app.db('users').insert(user, '*');
  };

  return { findAll, save };
};
