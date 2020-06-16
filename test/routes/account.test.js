const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../src/app');

const mainRoute = '/v1/accounts';
let user;

beforeAll(async () => {
  // Método do jest que recebe como parâmetro um callback e um timeout
  // Esse método é responsável por executar esse callback antes de todos os testes
  // O timeout é responsável por especificar o tanto de tempo em milissegundos
  // Em que o beforeAll deve esperar antes de abortar a função (padrão é 5s)
  const res = await app.services.user.save({
    name: 'User Account',
    mail: `${Date.now()}@mail.com`,
    passwd: '123456',
  });
  user = { ...res[0] };
  user.token = jwt.encode(user, 'Segredo!');
});

test('Deve inserir uma conta com sucesso', () => {
  return request(app)
    .post(mainRoute)
    .send({ name: 'Acc #1', user_id: user.id })
    .set('authorization', `bearer ${user.token}`)
    .then((result) => {
      expect(result.status).toBe(201);
      expect(result.body.name).toBe('Acc #1');
    });
});

test('Não deve inserir uma conta sem nome', () => {
  return request(app)
    .post(mainRoute)
    .send({ user_id: user.id })
    .set('authorization', `bearer ${user.token}`)
    .then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('Nome é um atributo obrigatório');
    });
});

test.skip('Não deve inserir uma conta de nome duplicado, para o mesmo usuário', () => {});

test('Deve listar todas as contas', () => {
  return app
    .db('accounts')
    .insert({ name: 'Acc list', user_id: user.id })
    .then(() =>
      request(app).get(mainRoute).set('authorization', `bearer ${user.token}`),
    )
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test.skip('Deve listar apenas as contas do usuário', () => {});

test('Deve retornar uma conta por Id', () => {
  return (
    app
      .db('accounts')
      // informa para o knex que quer que retorne apenas o id
      .insert({ name: 'Acc By Id', user_id: user.id }, ['id'])
      // retorna uma lista com os usuários inseridos, no caso, apenas 1
      .then((acc) =>
        request(app)
          .get(`${mainRoute}/${acc[0].id}`)
          .set('authorization', `bearer ${user.token}`),
      )
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Acc By Id');
        expect(res.body.user_id).toBe(user.id);
      })
  );
});

test.skip('Não deve retornar uma conta de outro usuário', () => {});

test('Deve alterar uma conta', () => {
  return app
    .db('accounts')
    .insert({ name: 'Acc To Update', user_id: user.id }, ['id'])
    .then((acc) =>
      request(app)
        .put(`${mainRoute}/${acc[0].id}`)
        .send({ name: 'Acc Updated' })
        .set('authorization', `bearer ${user.token}`),
    )
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Acc Updated');
    });
});

test.skip('Não deve alterar uma conta de outro usuário', () => {});

test('Deve remover uma conta', () => {
  return app
    .db('accounts')
    .insert({ name: 'Acc to remove', user_id: user.id }, ['id'])
    .then((acc) =>
      request(app)
        .delete(`${mainRoute}/${acc[0].id}`)
        .set('authorization', `bearer ${user.token}`),
    )
    .then((res) => {
      expect(res.status).toBe(204); // Resposta sem conteúdo, pois removemos
    });
});

test.skip('Não deve remover uma conta de outro usuário', () => {});
