// pacotes
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// middleware
const { isAuthenticated } = require('../middlewares/jwt.middleware');

// modelos
const User = require('../models/User.model');

// rotas
router.post('/signup', async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      res.status(400).json({message: 'Campos são obrigatórios!'});
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if(!emailRegex.test(email)) {
      res.status(400).json({ message: 'Email não é válido!'});
      return;
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if(!passwordRegex.test(password)) {
      res.status(400).json({ message: 'Senha deve ter 6 caracteres e ao menos 1 letra maiúscula, 1 minúscula e 1 número.'});
      return;
    }

    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: 'Email já cadastrado!'});
      return;
    }

    const hash = bcrypt.hashSync(password, 12);

    const userFromDB = await User.create({ username, email, passwordHash: hash });
    const { _id, role } = userFromDB;
    res.status(201).json({ _id, username: userFromDB.username, email: userFromDB.email, role });
  } catch (error) {
    next(error);
  }
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if(!username || !password) {
      res.status(400).json({ message: 'Campos são obrigatórios!'});
      return;
    }
    const foundUser = await User.findOne({ username });
    if(!foundUser) {
      res.status(400).json({ message: 'Usuário ou senha incorretos.'});
      return;
    }

    const verify = bcrypt.compareSync(password, foundUser.passwordHash)
    if(!verify) {
      res.status(400).json({ message: 'Usuário ou senha incorretos.'});
      return;
    }

    const payload = {
      _id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: "6h"})

    res.status(200).json({ authToken: token });

  } catch (error) {
    next(error);
  }
})

router.get('/verify', isAuthenticated, (req, res) => {
  res.json(req.payload);
})

module.exports = router;