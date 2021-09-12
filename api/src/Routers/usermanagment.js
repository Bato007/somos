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

/**
 * @swagger
 * /user/information:
 *  put:
 *    summary: Actualiza la informacion de un usuario se debe de mandar toda la informacion
 *    tags: [Usuarios]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: La persona que quiere el cambio
 *              email:
 *                type: string
 *                description: Nuevo email
 *              password:
 *                type: string
 *                description: Nueva contraseña
 *              confirm:
 *                type: string
 *                description: La confirmacion de la nueva contraseña
 *              phone:
 *                type: integer
 *                description: El nuevo numero de celular
 *              residence:
 *                type: string
 *                description: El lugar de residencia del usuario
 *              categories:
 *                type: array
 *                description: Las nuevas categorias
 *            example:
 *              username: ama19020
 *              email: example@somos.gmail
 *              password: aA@123456
 *              confirm: aA#123456
 *              phone: 12345678
 *              residence: Guatemala
 *              categories: [somos, iglesia]
 *    responses:
 *      200:
 *        description: La informacion se cambio
 *      400:
 *        description: La cuenta no es de a quien le pertenece
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      500:
 *        description: Error en el servidor
 */
router.put('/information')

module.exports = router
