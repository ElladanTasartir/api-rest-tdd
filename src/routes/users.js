module.exports = (app) => {
  const findAll = (req, res) => {
    // O objeto retornado no knex() é uma função que quando executa, é possível realizar querys
    app.services.user.findAll().then((result) => res.status(200).json(result));
  };

  const create = async (req, res) => {
    const user = await app.services.user.save(req.body);
    if (user.error) return res.status(400).json(user);
    // Pode-se inserir mais de um registro de uma vez através do knex
    // Insere e retorna um array com tudo (*) que foi inserido, por ser postgre ele retorna os dados
    // MySQL, por exemplo, não funcionaria pois ele não possui return
    // Por estarmos retornando apenas um dado dentro do array, podemos desestruturar

    return res.status(201).json(user[0]);
  };

  return { findAll, create };
};
