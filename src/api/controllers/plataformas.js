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

const putPlataforma = async (req, res, next) => {
  try {
    const { id } = req.params
    const { juegosToAdd, juegosToRemove } = req.body

    if (!Array.isArray(juegosToAdd) || !Array.isArray(juegosToRemove)) {
      return res.status(400).json('Los parámetros deben ser arrays')
    }

    if (juegosToAdd && juegosToAdd.length > 0) {
      const juegosExistentes = await Juego.find({ _id: { $in: juegosToAdd } })
      if (juegosExistentes.length !== juegosToAdd.length) {
        return res.status(400).json('Algunos juegos no existen')
      }

      const plataformaUpdated = await Plataforma.findByIdAndUpdate(
        id,
        { $addToSet: { juegos: { $each: juegosToAdd } } },
        { new: true }
      )
      return res.status(200).json(plataformaUpdated)
    }

    if (juegosToRemove && juegosToRemove.length > 0) {
      const plataformaUpdated = await Plataforma.findByIdAndUpdate(
        id,
        { $pull: { juegos: { $in: juegosToRemove } } }, // $in elimina los juegos especificados
        { new: true }
      )
      return res.status(200).json(plataformaUpdated)
    }

    return res
      .status(400)
      .json('No se especificaron juegos para agregar o eliminar')
  } catch (error) {
    console.error(error)
    return res.status(400).json('Error en la solicitud')
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
