const express = require('express')
const Joi = require('joi')
const multer = require('multer')
const hola = require('uuid-v4')
const { bucket } = require('../DataBase/firebase')

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
 *  users: ['user1', 'user2', ..., 'user3']
 * }
 */
router.post('/', upload.single('file'), (req, res) => {
  // const schema = Joi.object({
  //   title: Joi.string().required(),
  //   description: Joi.string().required(),
  //   tags: Joi.array().min(1).required(),
  //   category: Joi.array().required(),
  //   users: Joi.array().required(),
  // })

  // // Validando que todo este correcto
  // const result = schema.validate(req.body)
  // const { message } = result.error.details[0]
  // res.status(400).json({ message })

  // Validar informacino
  // Subir la info al store
  // Meter la data al db

  // Luego de validar todos los datos se pasa al try
  try {
    const { file } = req

    // console.log(file.buffer)
    // const hola = fs.readFile('../upload/emociones.jpeg', 'utf-8', () => console.log('hola'))
    // Guardando la imagen en firebase
    bucket.upload('./upload/emociones.jpeg', { metadata: { metadata: { firebaseStorageDownloadTokens: hola() } } }).then((data) => {
      console.log(data)
    })

    // resource.put(file).then((response) => {
    // })
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
