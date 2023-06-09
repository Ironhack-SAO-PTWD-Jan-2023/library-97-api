// pacotes
require('dotenv/config');
const express = require('express');

// iniciar o express
const app = express();

// configurações
require('./db');
require('./configs')(app);

// middlewares gerais
const { isAuthenticated } = require('./middlewares/jwt.middleware');

// rotas
app.use('/auth', require('./routes/auth.routes'));

app.use(isAuthenticated);
app.use('/books', require('./routes/book.routes'));
app.use('/user', require('./routes/user.routes'));

// gerenciamento de erros
require('./error-handling')(app);
// app.use((req, res) => {
//   res.status(404).json('Não encontrado.'); // @TODO: será atualizado depois!
// })

// exportar app
module.exports = app;
