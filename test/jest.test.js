// Criando o primeiro teste
// test(nomeDoTeste, () => {
// Código a ser testado
// })
test('Devo conhecer as principais assertivas do Jest', () => {
  let number = null;
  // assertiva do jest que testa se o valor recebido é nulo
  // se o valor fosse qualquer coisa que não fosse nula
  // o teste falharia
  expect(number).toBeNull();
  number = 10;
  // Negação da afirmação anterior, espera um valor não nulo
  expect(number).not.toBeNull();
  expect(number).toBe(10); // verifica igualdade
  // para tipos primitivos, tanto o toBe quanto o
  // toEqual são iguais
  expect(number).toEqual(10); // também verifica igualdade
  expect(number).toBeGreaterThan(9);
  expect(number).toBeLessThan(11);
});

test('Devo saber trabalhar com objetos', () => {
  const obj = { name: 'John', mail: 'john@mail.com' };
  expect(obj).toHaveProperty('name'); // se o objeto possui dada propriedade
  expect(obj).toHaveProperty('name', 'John'); //  se o objeto possui a propriedade e o valor dedfinidos
  expect(obj.name).toBe('John'); // string é um tipo primitivo então, podemos

  const obj2 = { name: 'John', mail: 'john@mail.com' };
  /*  expect(obj).toBe(obj2); // O teste falha, pois os valores, apesar de serem iguais, não são exatamente o mesmo objeto */
  expect(obj).toEqual(obj2); // Verifica igualdade nos valores, então o teste passa
  expect(obj).toBe(obj);
});
