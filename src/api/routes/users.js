const { isAdmin, isAuth } = require('../../middlewares/auth')
const {
  getUsers,
  register,
  login,
  updateUser,
  deleteUser
} = require('../controllers/users')

const usersRoutes = require('express').Router()

usersRoutes.get('/', [isAdmin], getUsers)
usersRoutes.post('/register', register)
usersRoutes.post('/login', login)
usersRoutes.put('/:id', [isAdmin], updateUser)
usersRoutes.delete('/:id', [isAuth], deleteUser)

module.exports = usersRoutes
