const express = require('express')
const Joi = require('joi')
const { valPassword, valRegion } = require('../Middleware/validation')
const { cUsers, cKeys, FieldValue } = require('../DataBase/firebase')

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

router.get('/:usernameid', async (req, res) => {
  try {
    // Se obtiene el usaurio
    const { usernameid } = req.params

    // Ahora se obtiene al usuario y se verifica si esta
    const user = await cUsers.doc(usernameid).get()

    if (!user.exists) {
      res.statusCode = 404
      res.end()
    } else {
      const {
        username, email, phone, residence, categories,
      } = user.data()

      // Ahora se regresa
      res.statusCode = 200
      res.json({
        username, email, tel: phone, address: residence, categories,
      })
    }
  } catch (error) {
    console.log(error)
    res.statusCode = 500
    res.end()
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
    password: Joi.string().min(8),
    confirm: Joi.string().min(8).valid(Joi.ref('password')).messages({
      'any.only': 'ERROR 100 password required',
    }),
    email: Joi.string().email().required(),
    phone: Joi.number().messages({
      'number.base': 'ERROR 101 phone must be an integer',
    }),
    residence: Joi.string().required(),
    categories: Joi.array().min(1).required().messages({
      'array.min': 'ERROR 102 user needs category',
    }),
  }).messages({
    'any.required': 'ERROR 100 missing required fields',
    'string.email': 'ERROR 101 invalid email',
  })

  // Validar informacion
  const result = schema.validate(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    res.statusCode = 400
    res.json({ message })
  } else {
    try {
      const {
        username, password, confirm, email, residence, categories,
      } = req.body
      let { phone } = req.body
      let updateIt = true
      const { somoskey } = req.headers

      // Se verifica que la llave coincida
      const key = (await cKeys.doc(username).get()).data()
      if (key.somoskey !== somoskey) {
        updateIt = false
        res.statusCode = 401
        res.json({ message: 'Not allowed to do this operation' })
      }

      // Handle password change
      if (password || confirm) {
        // Si las claves son iguales
        if (password === confirm) {
          if (!valPassword(password)) { // Cuando son iguales las claves
            updateIt = false
            res.statusCode = 400
            res.json({ message: 'ERROR 105 invalid password' })
          }
        } else {
          updateIt = false
          res.statusCode = 400
          res.json({ message: 'ERROR 106 different passwords' })
        }
      }

      const place = valRegion(residence)
      if (!place) {
        updateIt = false
        res.statusCode = 400
        res.json({ message: 'ERROR 107 invalid country' })
      }

      // Handle update
      if (updateIt) {
        if (!phone) { phone = FieldValue.delete() }
        await cUsers.doc(username).update({
          password, email, phone, residence: place, categories,
        })
        // Falta ver lo de las categorias
        res.statusCode = 200
        res.json()
      }
      // Se realiza el update de todo
    } catch (error) {
      res.statusCode = 500
      res.json()
    }
  }
})

module.exports = router
