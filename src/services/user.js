const bcrypt = require('bcrypt');
const ValidationError = require('../errors/ValidationError');

module.exports = (app) => {
  const findAll = () => {
    return app.db('users').select(['id', 'name', 'mail']);
    // o select vai trazer apenas essas informações
    // vai retornar a promise
  };

  const findOne = (filter = {}) => {
    // Se mandar o filtro, ele usa, caso o filtro seja vazio, pega todo mundo
    return app.db('users').where(filter).first();
  };

  const getPasswdHash = (passwd) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(passwd, salt);
  };

  const save = async (user) => {
    if (!user.name) throw new ValidationError('Nome é um atributo obrigatório');
    if (!user.mail)
      throw new ValidationError('Email é um atributo obrigatório');
    if (!user.passwd)
      throw new ValidationError('Senha é um atributo obrigatório');

    const userDb = await findOne({ mail: user.mail });
    if (userDb)
      throw new ValidationError('Já existe um usuário com esse email');

    // Para não alterar o objeto sendo enviado pela função,
    // e permanecer como uma função pura, criamos um novo objeto recebendo
    // os dados de usuário, para pode refatorá-lo com a nova senha
    const newUser = { ...user };
    newUser.passwd = getPasswdHash(user.passwd);
    return app.db('users').insert(newUser, ['id', 'name', 'mail']);
  };

  return { findAll, save, findOne };
};
