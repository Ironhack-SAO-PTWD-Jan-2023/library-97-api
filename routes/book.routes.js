const router = require('express').Router();

// modelo
const Book = require('../models/Book.model');

// middlewares
const { isAdmin } = require('../middlewares/role.middleware');

// rotas
// Crud -> Create
router.post('/', async (req, res, next) => {
  const { title, description, author, rating } = req.body;
  try {
    if(!title) {
      res.status(400).json({message: "Título é obrigatório!"});
      return;
    };
    // await Book.create(req.body);
    const newBookFromDB = await Book.create({ title, description, author, rating });
    res.status(200).json(newBookFromDB);
  } catch (error) {
    next(error);
  }
})

// cRud -> Read
router.get('/', async (req, res, next) => {
  const { page, limit } = req.query;
  try {
    const booksFromDB = await Book.find().limit(limit).skip(limit * (page - 1));
    res.status(200).json(booksFromDB);
  } catch (error) {
    next(error);
  }
})

router.get('/:bookId', async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const bookFromDB = await Book.findById(bookId);
    res.status(200).json(bookFromDB);
  } catch (error) {
    next(error);
  }
})

// crUd -> Update
router.put('/:bookId', async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const bookFromDB = await Book.findByIdAndUpdate(bookId, req.body, {new: true});
    res.status(200).json(bookFromDB);
  } catch (error) {
    next(error);
  }
})

// cruD -> Delete;
router.delete('/:bookId', async (req, res, next) => {
  const { bookId } = req.params;
  try{
    await Book.findByIdAndRemove(bookId);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
})

// exportando rotas
module.exports = router;
