const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    rol: {
      type: String,
      required: true,
      enum: ['admin', 'user'],
      default: 'user'
    },

    juegos: [
      { type: mongoose.Types.ObjectId, ref: 'juegos', required: false } // Asegúrate de que este campo exista
    ]
  },
  {
    timestamps: true,
    collection: 'users'
  }
)

const User = mongoose.model('users', userSchema, 'users')
module.exports = User
