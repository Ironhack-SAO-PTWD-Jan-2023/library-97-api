// pacotes
require('dotenv/config');
const express = require('express');

// iniciar o express
const app = express();

// configurações

// middlewares gerais

// rotas

// gerenciamento de erros
app.use((req, res) => {
  res.status(404).json('Não encontrado.');
})

// exportar app
module.exports = app;
