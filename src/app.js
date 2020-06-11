const app = require("express")();
const consign = require("consign");

// vai pedir para o consign pegar o arquivo de middlewares e inserir ele como módulo de app
// consign recebe um objeto de configuração onde podemos falar qual o diretório padrão que o consign vai estar olhando
consign({ cwd: "src", verbose: false })
  .include("./config/middlewares.js")
  .then('./routes') // para incluir mais arquivos, no caso, incluiremos uma pasta para pegar todos os seus arquivos e ligar ao app
  .then('./config/routes.js')
  .into(app);

app.get("/", (req, res) => {
  res.status(200).send();
});

module.exports = app;
