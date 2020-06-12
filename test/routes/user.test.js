const request = require('supertest');

const app = require('../../src/app');

// consign é uma dependência que faz o gerenciamento de arquivos na aplicação

test('Deve listar todos os usuários', () => {
  return request(app)
    .get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

// Utilizado o test.skip, para pular um test por hora
// Usado também o test.only, para que desse suit, apenas esse test seja realizado
test('Deve inserir usuário com sucesso', () => {
  const mail = `${Date.now()}@mail.com`;
  return request(app)
    .post('/users')
    .send({ name: 'Walter Mitty', mail, passwd: '123456' })
    .then((res) => {
      expect(res.status).toBe(201); // status para quando um recurso é criado
      expect(res.body.name).toBe('Walter Mitty');
    });
});
