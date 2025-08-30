const express = require('express');
const { Command } = require('commander');
const dotenv = require('dotenv');

const app = express();

const program = new Command();

// Definindo uma opção de linha de comando '-m' ou '--mode' para definir o ambiente de trabalho
program
  .option('-m, --mode <mode>', 'Define o ambiente de trabalho')
  .parse(process.argv);

// Obtendo as opções passadas pela linha de comando
const options = program.opts();

// Verificando se a opção 'mode' foi definida como 'development' ou 'production'
if (options.mode === 'development') {
  // Carregando as variáveis de ambiente do arquivo .env.dev se o modo for 'development'
  dotenv.config({ path: './.env.dev' });
} else if (options.mode === 'production') {
  // Carregando as variáveis de ambiente do arquivo .env.prod se o modo for 'production'
  dotenv.config({ path: './.env.prod' });
} else if (options.mode === 'staging') {
  // Carregando as variáveis de ambiente do arquivo .env.prod se o modo for 'production'
  dotenv.config({ path: './.env.staging' });
} else {
  // Caso o modo não seja definido corretamente, exibe uma mensagem de erro e encerra o programa
  console.error('Ambiente de trabalho não definido');
  process.exit(1);
}

// Obtendo a porta a partir das variáveis de ambiente
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send(`Hello Coders, servidor rodando no modo ${process.env.NODE_ENV} na porta ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});