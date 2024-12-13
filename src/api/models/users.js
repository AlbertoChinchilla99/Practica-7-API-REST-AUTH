const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: {
      type: String,
      required: true,
      enum: ['admin', 'user'],
      default: 'user'
    }
  },
  {
    timestamps: true,
    collection: 'users'
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  try {
    this.password = await bcrypt.hash(this.password, 10)
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model('users', userSchema, 'users')
module.exports = User
