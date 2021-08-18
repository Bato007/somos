const express = require('express')

const {
  getResourceById,
  getResourceByUser,
} = require('../Controller/resource')

const router = express.Router()

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
router.get('/:id', async (req, res) => getResourceById(req, res))

/**
 * Se encarga de obtener todos los recursos que
 * le correspondan a un usuario
 * {
 *  id: 'XKJR-KJ23-JE24-JKRE',
 *  title: 'prueba',
 *  type: 'pdf'
 * }
 */
router.get('/files/:username', async (req, res) => getResourceByUser(req, res))

module.exports = router
