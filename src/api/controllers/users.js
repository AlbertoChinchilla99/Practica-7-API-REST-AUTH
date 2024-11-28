const { generateSign } = require('../../config/jwt')
const User = require('../models/users')
const bcrypt = require('bcrypt')

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate('juegos')
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      userName: req.body.userName,
      password: req.body.password,
      rol: 'user'
    })

    const duplicateUser = await buscarUsuario(req.body.userName)

    if (duplicateUser) {
      return res.status(400).json('Ese nombre ya está en uso')
    }

    const userSaved = await newUser.save()
    return res.status(201).json(userSaved)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await buscarUsuario(req.body.userName)

    if (!user) {
      return res.status(400).json('Usuario no existente')
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id)
      return res.status(200).json({ user, token })
    } else {
      return res.status(400).json('La contraseña está mal crack')
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params

    const newUser = new User(req.body)
    newUser._id = id
    const userUpdated = await User.findByIdAndUpdate(id, newUser, { new: true })
    return res.status(200).json(UserUpdated)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params

    if (req.user.rol === 'admin' || req.user._id.toString() === id) {
      const userDeleted = await User.findByIdAndDelete(id)
      if (!userDeleted) {
        return res.status(404).json('Usuario no encontrado')
      }
      return res.status(200).json({
        message: 'Usuario eliminado correctamente',
        userDeleted
      })
    } else {
      return res
        .status(403)
        .json('No tienes permisos para eliminar a este usuario')
    }
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}
module.exports = { getUsers, register, login, updateUser, deleteUser }
