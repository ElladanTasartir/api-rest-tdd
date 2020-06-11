require('dotenv').config();

module.exports = {
  test: {
    // chave de teste para referenciar ao nosso objeto de teste
    client: 'pg',
    version: '12',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: process.env.DBPASSWORD,
      database: 'barriga',
    },
    migrations: {
      directory: 'src/migrations',
    },
  },
};
