const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const mail = `${Date.now()}@mail.com`;
// consign é uma dependência que faz o gerenciamento de arquivos na aplicação

let user;

beforeAll(async () => {
  const res = await app.services.user.save({
    name: 'User Account',
    mail: `${Date.now()}@mail.com`,
    passwd: '123456',
  });
  user = { ...res[0] };
  user.token = jwt.encode(user, 'Segredo!');
});

test('Deve listar todos os usuários', () => {
  return request(app)
    .get('/users')
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

// Utilizado o test.skip, para pular um test por hora
// Usado também o test.only, para que desse suit, apenas esse test seja realizado
test('Deve inserir usuário com sucesso', () => {
  return request(app)
    .post('/users')
    .send({ name: 'Walter Mitty', mail, passwd: '123456' })
    .then((res) => {
      expect(res.status).toBe(201); // status para quando um recurso é criado
      expect(res.body.name).toBe('Walter Mitty');
      expect(res.body).not.toHaveProperty('passwd');
    });
});

test('Deve armazenar senha criptografada', async () => {
  const res = await request(app)
    .post('/users')
    .send({
      name: 'Walter Mitty',
      mail: `${Date.now()}@mail.com`,
      passwd: '123456',
    });
  expect(res.status).toBe(201);
  const { id } = res.body;
  const userDB = await app.services.user.findOne({ id });
  expect(userDB.passwd).not.toBeUndefined();
  expect(userDB.passwd).not.toBe('123456');
});

test('Não deve inserir usuário sem nome', () => {
  return request(app)
    .post('/users')
    .send({ mail: 'walter@mail.com', passwd: '123456' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é um atributo obrigatório');
    });
});

test('Não deve inserir usuário sem email', async () => {
  const result = await request(app)
    .post('/users')
    .send({ name: 'Walter Mitty', passwd: '123456' });
  expect(result.status).toBe(400);
  expect(result.body.error).toBe('Email é um atributo obrigatório');
});

test('Não deve inserir usuário sem senha', (done) => {
  // done vai ajudar com o assincronismo do teste, ou seja, o teste só vai finalizar
  // quando  o done for chamado
  request(app)
    .post('/users')
    .send({ name: 'Walter Mitty', mail: 'walter@mail.com' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Senha é um atributo obrigatório');
      done(); // para informar que a requisição está finalizada
      // É uma das outras formas de segurar o teste até que este esteja completo
      // Pode-se usar o done.fail() para forçar o teste a falhar também
    })
    .catch((err) => done.fail(err));
});

test('Não deve inserir usuário com email existente', () => {
  return request(app)
    .post('/users')
    .send({ name: 'Walter Mitty', mail, passwd: '123456' })
    .then((res) => {
      expect(res.status).toBe(400); // status para quando um recurso é criado
      expect(res.body.error).toBe('Já existe um usuário com esse email');
    });
});
