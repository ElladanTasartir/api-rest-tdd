exports.up = (knex) => {
  // Recebe como parâmetros o knex e uma promise, mas iremos apenas utilizar o knes
  // Ação para criar o banco/atualizar
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNull();
    table.string('email').notNull().unique();
    table.string('passwd').notNull();
  });
};

exports.down = (knex) => {
  // Ação para retornar o banco à um estado anterior
  return knex.schema.dropTable('users');
};
