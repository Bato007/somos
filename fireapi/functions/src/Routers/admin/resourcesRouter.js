/* eslint-disable no-await-in-loop */
const express = require('express')
const Joi = require('joi')
const tokenGenerator = require('uuid-v4')
const {
  createTags, deleteTags, getArrayDiff, makeLower,
} = require('../../Middleware/services')
const { cResources, bucket } = require('../../DataBase/firebase')

const router = express.Router()

router.post('/', async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    tags: Joi.array().min(1).required(),
    category: Joi.array().required(),
    users: Joi.array().required(),
    date: Joi.date().required(),
    filename: Joi.string().required(),
  })
  res.statusCode = 400

  // Validar informacino
  const result = schema.validate(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    res.json({ message })
  } else if ((req.body.category.length + req.body.users.length) < 1) {
    res.json({ message: 'no se dirige a un usuario' })
  } else {
    try {
      const {
        title, description, tags, category, users, date, filename,
      } = req.body
      const token = tokenGenerator()
      const uploaded = bucket.file(filename)
      const url = await uploaded.getSignedUrl({
        action: 'read',
        expires: date,
      })
      const type = filename.split('.')[1]

      // Ahora se ingresa a la base de datos
      cResources.doc(token).set({
        id: token,
        title,
        description,
        users,
        categories: category,
        tags,
        available: date,
        type,
        filename,
        url,
      })

      res.statusCode = 200
      res.end()
    } catch (error) {
      console.log(error)
      res.statusCode = 500
      res.json({ message: 'Unexpected' })
    }
  }
})

/**
 * Sube un recurso al bucket, se le manda el
 * con el siguiente formato:
 * {
 *  id: 'id-ejemplo',
 *  title: 'ejemplo',
 *  description: 'ejemplo',
 *  tags: ['tag1', 'tag2', 'tag3', ..., 'tagn'],
 *  category: ['categoria1', 'categoria2', ..., 'categorian'],
 *  users: ['user1', 'user2', ..., 'user3'],
 *  date: '2021-01-01'
 * }
 */
router.put('/', async (req, res) => {
  const schema = Joi.object({
    id: Joi.string().min(1).required(),
    title: Joi.string().min(1).max(50).required(),
    description: Joi.string().min(1).max(255).required(),
    tags: Joi.array().min(1),
    category: Joi.array().required(),
    users: Joi.array().required(),
    date: Joi.date().required(),
    filename: Joi.string().required(),
  })
  console.log('holaaaa')

  // Validar informacino
  const result = schema.validate(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    res.status(400).json({ message })
  } else if ((req.body.category.length + req.body.users.length) < 1) {
    res.status(400).json({ message: 'no se dirige a un usuario' })
  } else {
    // Luego de validar todos los datos se pasa al try
    try {
      const {
        id, title, description, users, date,
      } = req.body
      let { tags, category } = req.body
      category = makeLower(category)
      tags = makeLower(tags)

      // Obteniendo el nombre del archivo
      const resources = await cResources.doc(id).get()
      const data = resources.data()
      const { filename } = data
      const rTags = data.tags
      const { added, removed } = getArrayDiff(rTags, tags)
      console.log(added, removed)

      // Se agregan las tags / eliminan
      const tResource = {
        id: data.id,
        title: data.title,
        type: data.type,
      }
      createTags(added, tResource)
      deleteTags(removed, tResource)

      // Guardando la imagen en firebase
      const uploaded = bucket.file(filename)
      const url = await uploaded.getSignedUrl({
        action: 'read',
        expires: date,
      })

      // Ahora se ingresa a la base de datos
      await cResources.doc(id).update({
        title,
        description,
        tags,
        categories: category,
        users,
        available: date,
        url,
      })
      res.status(200).json({ message: 'DONE' })
    } catch (error) {
      console.log(error.message)
      res.status(400).json({ message: 'Unexpected' })
    }
  }
})

/**
 * Se encarga de borrar el recurso
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const resources = await cResources.doc(id).get()
    const resource = resources.data()

    // Se borra del bucket
    deleteTags()
    const file = bucket.file(resource.filename)
    await file.delete()

    // Se borra de la base de datos
    await cResources.doc(id).delete()

    // Ahora se regresa el recurso
    res.status(200)
  } catch (error) {
    res.status(500).json({ message: 'Error al borrar' })
  }
})

module.exports = router
