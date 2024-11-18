const mongoose = require('mongoose')
const Juego = require('../../api/models/juegos')
const juegosData = require('../data/juegosData')

const seedJuegos = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://<usuario>:<contraseña>@cluster0.kwu3o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    )

    await Juego.collection.drop()
    console.log('Juegos eliminados')

    await Juego.insertMany(juegosData)
    console.log('Juegos introducidos')

    await mongoose.disconnect()
    console.log('Desconectado de la base de datos')
  } catch (error) {
    console.error('Error al insertar los juegos:', error)
    await mongoose.disconnect()
  }
}

seedJuegos()
