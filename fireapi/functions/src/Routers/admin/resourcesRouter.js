const express = require('express')
const multer = require('multer')
const Joi = require('joi')
const tokenGenerator = require('uuid-v4')
const fs = require('fs')

const { cResources, bucket } = require('../../DataBase/firebase')

const router = express.Router()

// Multer
const option = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: option })

/**
 * Sube un recurso al bucket, se le manda el
 * con el siguiente formato:
 * {
 *  title: 'ejemplo',
 *  description: 'ejemplo',
 *  tags: ['tag1', 'tag2', 'tag3', ..., 'tagn'],
 *  category: ['categoria1', 'categoria2', ..., 'categorian'],
 *  users: ['user1', 'user2', ..., 'user3'],
 *  date: '2021-01-01',
 *  file: { }
 * }
 */
router.post('/upload', upload.single('resource'), (req, res) => {
  res.statusCode = 200
  res.end()
})

router.post('/', async (req, res) => {
  const schema = Joi.object({
    filename: Joi.string().required(),
    title: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    tags: Joi.array().min(1).required(),
    category: Joi.array().required(),
    users: Joi.array().required(),
    date: Joi.date().required(),
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
    // Luego de validar todos los datos se pasa al try
    try {
      const {
        title, description, tags, category, users, date, filename,
      } = req.body

      // Guardando la imagen en firebase
      const filenaPath = `./upload/${filename}`
      const token = tokenGenerator()
      await bucket.upload(filenaPath,
        {
          metadata: { metadata: { firebaseStorageDownloadTokens: token } },
          public: true,
        })
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

      try {
        fs.unlinkSync(filenaPath)
        res.statusCode = 200
      } catch (err) {
        res.statusCode = 500
      }
      res.end()
    } catch (error) {
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
  })

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
        id, title, description, tags, category, users, date,
      } = req.body

      // Obteniendo el nombre del archivo
      const resources = await cResources.doc(id).get()
      const { filename } = resources.data()

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
    const file = bucket.file(resource.filename)
    await file.delete()

    // Se borra de la base de datos
    await cResources.doc(id).delete()

    // Ahora se regresa el recurso
    res.status(200)
  } catch (error) {
    res.status(400).json({ message: 'Error al borrar' })
  }
})

module.exports = router
