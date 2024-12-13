const mongoose = require('mongoose')
const Plataforma = require('../../api/models/plataformas')
const PlataformaData = require('../data/plataformasData')
const Juego = require('../../api/models/juegos')

const seedPlataformas = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://albertochinchilla1999:2Sb3LkU6VxURG6xD@cluster0.kwu3o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    )

    await Plataforma.collection.drop()
    console.log('Plataformas eliminadas')

    const juegos = await Juego.find()

    PlataformaData.forEach((plataforma, index) => {
      plataforma.juegos = juegos
        .slice(index * 3, (index + 1) * 3)
        .map((juego) => juego._id)
    })

    await Plataforma.insertMany(PlataformaData)
    console.log('Plataformas introducidas')

    await mongoose.disconnect()
    console.log('Desconectado de la base de datos')
  } catch (error) {
    console.error('Error al insertar las plataformas:', error)
    await mongoose.disconnect()
  }
}

seedPlataformas()
