const express = require('express')
const Joi = require('joi')
const multer = require('multer')
const tokenGenerator = require('uuid-v4')
const fs = require('fs')
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
 * Se encarga de obtener un recurso con base a su
 * id
 * Lo que devuelve es un objeto con la informacion del
 * recurso de la siguiente manera
 * {
 *  id: 'XKJR-KJ23-JE24-JKRE',
 *  title: 'prueba',
 *  description: 'Ejemplo',
 *  availabe: '2021-01-01',
 *  type: 'pdf',
 *  url: 'ejemplo'
 *  tags: ['tag1', 'tag2', 'tag3']
 * }
 */
router.get('/:id', async (req, res) => {
  const client = await pool.connect()
  const { id } = req.params

  try {
    const tempResource = await client.query(`
      SELECT *
      FROM resource
      WHERE id = $1; 
    `, [id])

    const resource = tempResource.rows[0]

    const tempTags = await client.query(`
      SELECT tag
      FROM resource_tag
      WHERE id = $1;
    `, [id])

    const auxTags = tempTags.rows
    const tags = []
    auxTags.forEach((value) => {
      const { tag } = value
      tags.push(tag)
    })

    // Ahora se regresa el recurso
    res.json({
      ...resource,
      tags,
    })
  } catch (error) {
    res.json({ message: 'No se encontro' })
  }
})

/**
 * Se encarga de obtener todos los recursos que
 * le correspondan a un usuario
 * {
 *  id: 'XKJR-KJ23-JE24-JKRE',
 *  title: 'prueba',
 *  resource: 'pdf'
 * }
 */
router.get('/files/:username', async (req, res) => {
  const client = await pool.connect()
  const { username } = req.params

  try {
    // Se obtienen las categorias de los usuarios
    const tempCategories = await client.query(`
      SELECT category
      FROM somos_user NATURAL JOIN user_category
      WHERE username = $1;   
    `, [username])

    // Se obtiennen las categorias en un array
    const categories = []
    const auxCategories = tempCategories.rows
    auxCategories.forEach((value) => {
      const { category } = value
      categories.push(category)
    })

    // Obtiene lso recursos del usuario
    const tempResource = await client.query(`
      SELECT *
      FROM get_resources($1, $2); 
    `, [username, categories])

    const resource = tempResource.rows

    // Ahora se regresan los recursos
    res.json(resource)
  } catch (error) {
    res.json({ message: 'No se encontro' })
  }
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
router.post('/', upload.single('upload'), async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
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
  }

  if ((req.body.category.length + req.body.users.length) < 1) {
    res.status(400).json({ message: 'no se dirige a un usuario' })
  }

  const client = await pool.connect()
  // Luego de validar todos los datos se pasa al try
  try {
    const {
      title, description, tags, category, users, date,
    } = req.body
    const { file } = req

    // Guardando la imagen en firebase
    // const filenaPath = `./upload/${file.filename}`
    const token = tokenGenerator()
    bucket.upload('./upload/nokia.pdf',
      {
        metadata: { metadata: { firebaseStorageDownloadTokens: token } },
        public: true,
      })
    const uploaded = bucket.file('nokia.pdf')
    const url = await uploaded.getSignedUrl({
      action: 'read',
      expires: date,
    })

    // Ahora se ingresa a la base de datos
    await client.query(`
      BEGIN;
    `)

    await client.query(`
      INSERT INTO resource VALUES
        ($1, $2, $3, $4, $5, $6);
    `, [token, title, description, date, 'pdf', url])

    await client.query(`
      SELECT insert_resource_info($1, $2, $3, $4);
    `, [token, tags, category, users])

    await client.query(`
      COMMIT;
    `)
    res.json({ message: 'DONE' })
  } catch (error) {
    await client.query(`
      ROLLBACK;
    `)
    res.json({ message: 'Unexpected' })
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
  }

  if ((req.body.category.length + req.body.users.length) < 1) {
    res.status(400).json({ message: 'no se dirige a un usuario' })
  }

  const client = await pool.connect()
  // Luego de validar todos los datos se pasa al try
  try {
    const {
      id, title, description, tags, category, users, date,
    } = req.body

    // Obteniendo el nombre del archivo
    const aux = await client.query(`
      SELECT name
      FROM resource 
      WHERE id = $1;
    `, [id])
    const { name } = aux.rows[0]

    // Guardando la imagen en firebase
    const uploaded = bucket.file(name)
    const url = await uploaded.getSignedUrl({
      action: 'read',
      expires: date,
    })

    // Ahora se ingresa a la base de datos
    await client.query(`
      BEGIN;
    `)

    await client.query(`
      UPDATE resource SET
        title = $1,
        description = $2,
        available = $3,
        url =  $4
      WHERE id = $5;
    `, [title, description, date, url, id])

    // Limpiando los users a los que va, categorias y tags
    await client.query(`
      SELECT clear_resource($1);
    `, [id])

    await client.query(`
      SELECT insert_resource_info($1, $2, $3, $4);
    `, [id, tags, category, users])

    await client.query(`
      COMMIT;
    `)
    res.json({ message: 'DONE' })
  } catch (error) {
    await client.query(`
      ROLLBACK;
    `)
    res.json({ message: 'Unexpected' })
  }
})

module.exports = router
