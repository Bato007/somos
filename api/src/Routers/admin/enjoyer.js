const express = require('express')
const {
  getAllUsers,
  getUserCategories,
  desactivateUser,
  activateUser,
  deleteUser,
} = require('../../Controller/user')

const router = express.Router()

/**
 * Devuelve a todos los usuarios
 */
router.get('/', async (req, res) => getAllUsers(req, res))

/**
 * @swagger
 * /admin/user/{username}/categories:
 *  get:
 *    summary: Retorna todas las categorias de un usuario
 *    tags: [Admin, Categorias]
 *    parameters:
 *      - in: path
 *        name: username
 *        schema:
 *          type: string
 *        required: true
 *        description: El username del usuario
 *    responses:
 *      200:
 *        description: Obtiene todas las categorias de un usuario
 *        content:
 *          application/json:
 *            type: array
 *            items:
 *              type: string
 *      404:
 *        description: No se encontro al usuario
 *      500:
 *        description: Hubo un error del server
 */
router.get('/:username/categories', async (req, res) => getUserCategories(req, res))

/*
  Esta funcion recibe un Json con el siguiente formato:
  {
    username: 'ejemplo',
  }
 */
router.put('/desactivate', async (req, res) => desactivateUser(req, res))

/*
  Esta funcion recibe un Json con el siguiente formato:
  {
    username: 'ejemplo',
  }
 */
router.put('/activate', async (req, res) => activateUser(req, res))

/*
  Esta funcion recibe el username de la que se quiere borrar
  se remplaza el :username
 */
router.delete('/:username', async (req, res) => deleteUser(req, res))

module.exports = router
