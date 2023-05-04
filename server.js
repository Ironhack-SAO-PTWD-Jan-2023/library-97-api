// importar o app
const app = require('./app');

// configurar a porta
const PORT = process.env.PORT || 5000;

// ouvir a porta de conexão
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})
