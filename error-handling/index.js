module.exports = (app) => {
  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Rota não encontrada.'
    });
  })

  app.use((err, req, res, next) => {
    console.log('ERRO!!!', req.method, req.path, err);
    if(!res.headersSent){
      res.status(500).json({
        message: 'Erro interno do servidor. Verifique o console para mais informações.'
      })
    }
  })
}