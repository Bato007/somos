const express = require('express')
const Joi = require('joi')
const Busboy = require('busboy')
const tokenGenerator = require('uuid-v4')
const path = require('path')
const fs = require('fs')
const os = require('os')

const { cResources, bucket } = require('../../DataBase/firebase')

const router = express.Router()

router.post('/upload', (req, res) => {
  // Luego de validar todos los datos se pasa al try
  const token = tokenGenerator()

  // Ahora se empieza a subir el archivo
  const busBoy = new Busboy({ headers: req.headers })
  const tempdir = os.tmpdir()

  const uploads = []
  const fileWrites = []

  busBoy.on('error', (e) => {
    console.log('Failed to read', e)
    res.statusCode = 500
  })

  // Para cada file
  busBoy.on('file', (fieldname, file, filename) => {
    const filePath = path.join(tempdir, filename)
    uploads.push(filePath)

    const writeStream = fs.createWriteStream(filePath)
    file.pipe(writeStream)

    // Wait to be written
    const promise = new Promise((resolve, reject) => {
      file.on('end', () => { writeStream.end() })
      writeStream.on('finish', resolve)
      writeStream.on('error', reject)
    })
    fileWrites.push(promise)
  })

  busBoy.on('finish', async (e) => {
    await Promise.all(fileWrites)
    res.statusCode = 200

    for (let i = 0; i < uploads.length; i += 1) {
      bucket.upload(uploads[i], {
        metadata: { metadata: { firebaseStorageDownloadTokens: token } },
        public: true,
      })
    }
    res.statusCode = 200
    res.json({ message: 'Finished', token })
  })

  req.pipe(busBoy)
})

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
router.post('/', async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    tags: Joi.array().min(1).required(),
    category: Joi.array().required(),
    users: Joi.array().required(),
    date: Joi.date().required(),
    filename: Joi.string().required(),
    token: Joi.string().required(),
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
        title, description, tags, category, users, date, filename, token,
      } = req.body

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
