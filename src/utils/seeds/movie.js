const mongoose = require('mongoose')
const Movie = require('../../api/models/movie')
const movies = require('../../api/data/movies')

const lanzarSemilla = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://albertochinchilla1999:J12g2UwZZoJwinw5@proyectoddbb.z12cd.mongodb.net/?retryWrites=true&w=majority&appName=Proyectoddbb'
    )
    await Movie.collection.drop()
    console.log('Peliculas eliminadas')

    await Movie.insertMany(movies)
    console.log('Peliculas introducidas')

    await mongoose.disconnect()
    console.log('Desconectamos de la base de datos')
  } catch (error) {
    console.log('error')
  }
}
lanzarSemilla()
