const express = require('express')
const Joi = require('joi')
const multer = require('multer')
const tokenGenerator = require('uuid-v4')
const { bucket } = require('../DataBase/firebase')
const pool = require('../DataBase/database')

const router = express.Router()

// Multer
const option = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload')
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
 *  file: { }
 * }
 */
router.post('/', upload.single('upload'), async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    tags: Joi.array().min(1),
    category: Joi.array().required(),
    users: Joi.array().required(),
    date: Joi.date().required(),
  })

  console.log(req.body)
  console.log(req.file)
  // Validando que todo este correcto
  // Validar informacino
  const result = schema.validate(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    res.status(400).json({ message })
  }

  if ((req.body.category.length + req.body.users.length) < 1) {
    res.status(400).json({ message: 'no se dirige a un usuario' })
  }

  // Luego de validar todos los datos se pasa al try
  try {
    const {
      title, description, tags, category, users, date,
    } = req.body
    const { file } = req
    const client = await pool.connect()

    // Guardando la imagen en firebase
    const filenaPath = `./upload/${file.filename}`
    const token = tokenGenerator()
    bucket.upload(filenaPath, { metadata: { metadata: { firebaseStorageDownloadTokens: token } } })
      .then((data) => {
        console.log(data)
      })

    // Ahora se ingresa a la base de datos
    await client.query(`
      INSERT INTO 
    `)
  } catch (error) {
    console.log(error.message)
  }
  res.json('hola')
})

/**
 * Sube un recurso al bucket, se le manda el
 * objeto que tiene
 */
router.put('/', async (req) => {
  const schema = {
    title: Joi.string().required(),
  }

  const result = Joi.valid(req.body, schema)
  console.log(result.error)
})

module.exports = router
