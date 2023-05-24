const router = require('express').Router();

const { isAuthenticated } = require('../middlewares/jwt.middleware');
const uploadImage = require('../middlewares/cloudinary.middleware');

const User = require('../models/User.model');

// Create -> foi para o auth.routes.js
// router.post('/', async (req, res, next) => {
//   const { username } = req.body;
//   try {
//     await User.create({ username });
//     res.status(201).json(`Usuário ${username} criado com sucesso!`);
//   } catch (error) {
//     next(error);
//   }
// })

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
router.post('/add-book/:bookId', isAuthenticated, async (req, res, next) => {
  const { bookId } = req.params;
  const userId = req.payload._id;
  try {
    const userFromDB = await User.findByIdAndUpdate(userId, { $push: { books: bookId } }, { new: true });
    const { _id, username, books } = userFromDB; // para não enviar o passwordHash!!
    res.status(200).json({ _id, username, books });
  } catch (error) {
    next(error);
  }
});

router.get('/profile', async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const userFromDB = await User.findById(userId, { passwordHash: 0 });
    res.json(userFromDB);
  } catch (error) {
    next(error)
  }
})

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
    next(error);
  }
});

router.put('/image', uploadImage.single('profileImage'), async (req, res, next) => {
  const userId = req.payload._id;
  console.log(req.body)
  try {
    const { path } = req.file;
    const userFromDB = await User.findByIdAndUpdate(userId, { avatarUrl: path }, { new: true });
    const { username, avatarUrl } = userFromDB;
    res.json({ message: 'Upload Success!', user: { username, avatarUrl }});
  } catch (error) {
    next(error); 
  }
});


module.exports = router;
