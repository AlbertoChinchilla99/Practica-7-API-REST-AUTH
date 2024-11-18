const jwt = require('jsonwebtoken')

const generateSign = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}
const verifyjwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}
module.exports = { generateSign, verifyjwt }
