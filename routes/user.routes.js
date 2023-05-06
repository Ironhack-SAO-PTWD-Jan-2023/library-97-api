const router = require('express').Router();

const User = require('../models/User.model');

// Create
router.post('/', async (req, res, next) => {
  const { username } = req.body;
  try {
    await User.create({ username });
    res.status(201).json(`Usuário ${username} criado com sucesso!`);
  } catch (error) {
    next(error);
  }
})

// List users
router.get('/', async (req, res, next) => {
  try {
    const usersFromDB = await User.find();
    res.status(200).json(usersFromDB);
  } catch (error) {
    next(error);
  }
})

// adicionar livro ao usuário
router.post('/:userId/add-book/:bookId', async (req, res, next) => {
  const { userId, bookId } = req.params;
  try {
    const userFromDB = await User.findByIdAndUpdate(userId, { $push: { books: bookId } }, { new: true });
    res.status(200).json(userFromDB);
  } catch (error) {
    next(error);
  }
});

// listar usuário com as informações dos livros
router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const userFromDB = await User.findById(userId, {
      createdAt: 0, updatedAt: 0, __v: 0
    }).populate({
      path: 'books',
      select: '-createdAt -updatedAt -__v'
    });
    res.status(200).json(userFromDB);
  } catch (error) {
    
  }
})

// teste
router.get('/test', (req, res) => {
  res.json('rotas de USER conectadas!');
})

module.exports = router;
