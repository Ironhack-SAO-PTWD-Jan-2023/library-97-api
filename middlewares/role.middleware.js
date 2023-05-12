const isAdmin = (req, res, next) => {
  if(req.payload.role === 'admin') {
    next();
  } else {
    res.status(401).json('Usuário não autorizado!');
  }
}

module.exports = {
  isAdmin
}