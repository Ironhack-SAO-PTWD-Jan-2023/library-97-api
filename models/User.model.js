const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  books: {
    type: [ Schema.Types.ObjectId ],
    ref: 'Book'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    lowercase: true
  },
  avatarUrl: {
    type: String,
  }
}, { timestamps: true });

module.exports = model('User', userSchema);