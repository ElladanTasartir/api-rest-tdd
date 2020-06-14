const request = require('supertest');
const app = require('../../src/app');

const mainRoute = '/accounts';
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
});

test('Deve inserir uma conta com sucesso', () => {
  return request(app)
    .post(mainRoute)
    .send({ name: 'Acc #1', user_id: user.id })
    .then((result) => {
      expect(result.status).toBe(201);
      expect(result.body.name).toBe('Acc #1');
    });
});
