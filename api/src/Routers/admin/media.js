const express = require('express')
const multer = require('multer')

const {
  uploadResourceInfo,
  updateResource,
  deleteResource,
} = require('../../Controller/resource')

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

router.post('/upload', upload.single('resource'), (req, res) => {
  res.sendStatus(200)
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
router.post('/', async (req, res) => uploadResourceInfo(req, res))

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
router.put('/', async (req, res) => updateResource(req, res))

/**
 * Se encarga de borrar el recurso
 */
router.delete('/:id', async (req, res) => deleteResource(req, res))

module.exports = router
