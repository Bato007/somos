const express = require('express')
const Joi = require('joi')
const { cUsers, cKeys } = require('../DataBase/firebase')

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
router.get('/categories', async (req, res) => {
  try {
    const tempUsers = await cUsers.get()
    const users = []
    tempUsers.forEach((user) => {
      const { username, categories } = user.data()
      users.push({
        username,
        type: categories,
      })
    })

    res.status(200).json(users)
  } catch (error) {
    console.log(error.message)
    res.sendStatus(500)
  }
})

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
router.put('/information', async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.email().required(),
    password: Joi.string().min(8).required(),
    confirm: Joi.string().required().valid(Joi.ref('password')),
    phone: Joi.number().required(),
    residence: Joi.string().required(),
    categories: Joi.array().min(1).required(),
  })

  // Validar informacion
  const result = schema.validate(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    res.status(400).json({ username: 'ERROR', name: message })
  } else {
    try {
      const {
        username, password, confirm, email, phone, residence, categories,
      } = req.body

      // Se verifica que la llave coincida
      const temp = await cKeys.doc(username).get()
      // Se realiza el update de todo
    } catch (error) {
      res.sendStatus(500)
    }
  }
})

module.exports = router
