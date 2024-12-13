const Plataforma = require('../models/plataformas')

const getPlataformas = async (req, res, next) => {
  try {
    const plataformas = await Plataforma.find().populate('juegos')
    return res.status(200).json(plataformas)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getPlataformaById = async (req, res, next) => {
  try {
    const { id } = req.params
    const plataforma = await Plataforma.findById(id).populate('juegos')
    return res.status(200).json(plataforma)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const postPlataforma = async (req, res, next) => {
  try {
    const newPlataforma = new Plataforma(req.body)
    const plataformaSaved = await newPlataforma.save()
    return res.status(201).json(plataformaSaved)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const putPlataforma = async (req, res) => {
  try {
    const { id } = req.params
    const { juegosToAdd, juegosToRemove } = req.body

    const parseToArray = (input) =>
      Array.isArray(input) ? input : input ? [input] : []

    const juegosToAddArray = parseToArray(juegosToAdd)
    const juegosToRemoveArray = parseToArray(juegosToRemove)

    if (
      !juegosToAddArray.every((j) => typeof j === 'string') ||
      !juegosToRemoveArray.every((j) => typeof j === 'string')
    ) {
      return res
        .status(400)
        .json('Los parámetros deben ser strings o arrays de strings')
    }

    if (juegosToAddArray.length > 0) {
      const juegosExistentes = await Juego.find({
        _id: { $in: juegosToAddArray }
      })
      if (juegosExistentes.length !== juegosToAddArray.length) {
        return res.status(400).json('Algunos juegos no existen')
      }

      await Plataforma.findByIdAndUpdate(
        id,
        { $addToSet: { juegos: { $each: juegosToAddArray } } },
        { new: true }
      )
    }

    if (juegosToRemoveArray.length > 0) {
      await Plataforma.findByIdAndUpdate(
        id,
        { $pull: { juegos: { $in: juegosToRemoveArray } } },
        { new: true }
      )
    }

    return res.status(200).json('Actualización exitosa')
  } catch (error) {
    console.error(error)
    return res.status(500).json('Error en la solicitud')
  }
}

const deletePlataforma = async (req, res, next) => {
  try {
    const { id } = req.params
    const plataformaDeleted = await Plataforma.findByIdAndDelete(id)
    return res.status(200).json(plataformaDeleted)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

module.exports = {
  getPlataformas,
  getPlataformaById,
  postPlataforma,
  putPlataforma,
  deletePlataforma
}
