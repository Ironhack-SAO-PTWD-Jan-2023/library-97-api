const { connect } = require('mongoose');

const DB_URI = process.env.MONGO_URI;

async function connectDB () {
  console.log('Aguarde conexão com banco de dados...');
  try {
    if(!DB_URI) {
      throw new Error('Sem endereço do banco de dados.')
    }
    const x = await connect(DB_URI);
    console.log(`Conectado ao banco de dados: "${x.connections[0].name}"`);
  } catch (error) {
    console.log('Falha ao conectar bando de dados!', error);
    process.exit();
  }
}

connectDB();