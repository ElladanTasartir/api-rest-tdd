const request = require("supertest");

const app = require("../src/app");

// Se não cuidar da parte assíncrona do teste, o jest vai apenas passar de forma síncrona e ignorar o retorno da promise
// Seja ele resolvido ou não, por isso existem algumas formas de tratar
// Por exemplo, se retornarmos o valor dentro do teste, o próprio jest se encarregará de resolver as promises ou rejeitá-las
// Com async/await também funciona ao que testei

test("Deve responder na raíz", () =>
  request(app)
    .get("/")
    .then((res) => expect(res.status).toBe(200)));
