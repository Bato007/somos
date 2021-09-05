const express = require('express')

const {
  getCategoriesPerUser,
} = require('../Controller/user')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Manejo de usuarios del API
 */

/**
 * @swagger
 * /user/categories:
 *  get:
 *    summary: Obtiene a los usuarios con las categorias
 *    tags: [Usuarios]
 *    responses:
 *      200:
 *        description: Se obtienen todos los usuarios
 *      400:
 *        description: Hubo un error en el request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      500:
 *        description: Hubo un error del server
 */
router.get('/categories', (req, res) => getCategoriesPerUser(req, res))

module.exports = router
