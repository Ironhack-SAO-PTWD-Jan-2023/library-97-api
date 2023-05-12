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
      throw new Error('Campos são obrigatórios!');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if(!emailRegex.test(email)) {
      throw new Error('Email não é válido!');
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if(!passwordRegex.test(password)) {
      throw new Error('Senha deve ter 6 caracteres e ao menos 1 letra maiúscula, 1 minúscula e 1 número.')
    }

    const user = await User.findOne({ email });
    if (user) {
      throw new Error('Email já cadastrado!');
    }

    const hash = bcrypt.hashSync(password, 12);

    await User.create({ username, email, passwordHash: hash });
    res.status(201).json(`Usuário ${username} criado com sucesso!`);
  } catch (error) {
    next(error);
  }
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if(!username || !password) {
      throw new Error('Campos são obrigatórios!');
    }
    const foundUser = await User.findOne({ username });
    if(!foundUser) {
      throw new Error('Usuário ou senha incorretos.');
    }

    const verify = bcrypt.compareSync(password, foundUser.passwordHash)
    if(!verify) {
      throw new Error('Usuário ou senha incorretos.');
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