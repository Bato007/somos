const express = require('express')
const Joi = require('joi')
const customJoi = Joi.extend(require('joi-phone-number'))
const tokenGenerator = require('uuid-v4')
const { cAnnouncements, cUsers } = require('../DataBase/firebase')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Anuncios
 *   description: Los anuncios que maneja el API
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Error:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: describe el error ocurrido
 *      example:
 *        message: password min length is 8
 *    Anuncio:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: Identificador del anuncio
 *        contact:
 *          type: string
 *          description: Es la persona a quien se contactan
 *        phone:
 *          type: string
 *          description: El numero de celular de la persona
 *        email:
 *          type: string
 *          description: Es el correo al que se pueden contactar
 *        title:
 *          type: string
 *          description: Es el titulo del anuncio
 *        description:
 *          type: string
 *          description: Es el cuerpo del anuncio, que es lo que ofrece
 *        toDate:
 *          type: date
 *          description: Hasta que fecha es valido el anuncio
 *        published:
 *          type: integer
 *          description: Indica el estado del anuncio = no publicado(0), publicado(1), denegado(2)
 *      example:
 *        id: DJf0pe8LvFB75iUkXAuV
 *        country: Guatemala
 *        contact: Juan
 *        phone: 78945687
 *        email: hola@gmail.com
 *        title: Ayuda Mamas
 *        description: Para todas las que tengan hijos con alguna discapacidad
 *        toDate: 06/09/2021
 *        published: 0
 */

/**
 * @swagger
 * /announcements:
 *  get:
 *    summary: Retorna todos los anuncios publicados
 *    tags: [Anuncios]
 *    responses:
 *      200:
 *        description: Obtiene todos los anuncios
 *        content:
 *          application/json:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Anuncio'
 *              type:
 *                type: string
 *                description: El tipo del anuncio
 */
router.get('/', async (req, res) => {
  try {
    const tempAnnouncements = await cAnnouncements.where('published', '==', 1).get()
    const announcements = []
    tempAnnouncements.forEach((announcement) => {
      const data = announcement.data()
      announcements.push(data)
    })
    res.status(200).json(announcements)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Unexpected' })
  }
})

/**
 * @swagger
 * /announcements/help:
 *  get:
 *    summary: Retorna todos los anuncios de los brindadores de servicio
 *    tags: [Anuncios]
 *    responses:
 *      200:
 *        description: Obtiene todos los anuncios
 *        content:
 *          application/json:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Anuncio'
 */
router.get('/help', async (req, res) => {
  try {
    const temp = cAnnouncements.where('type', '==', 'help')
    const tempAnnouncements = await temp.where('published', '==', 1).get()
    const announcements = []
    tempAnnouncements.forEach((announcement) => {
      const data = announcement.data()
      announcements.push(data)
    })
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
})

/**
 * @swagger
 * /announcements/home:
 *  get:
 *    summary: Retorna todos los anuncios de los hogares / iglesias
 *    tags: [Anuncios]
 *    responses:
 *      200:
 *        description: Obtiene todos los anuncios
 *        content:
 *          application/json:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Anuncio'
 */
router.get('/home', async (req, res) => {
  try {
    const aux = cAnnouncements.where('type', '==', 'home')
    const tempAnnouncements = await aux.where('published', '==', 1).get()
    const announcements = []
    tempAnnouncements.forEach((announcement) => {
      const data = announcement.data()
      announcements.push(data)
    })
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
})

/**
 * @swagger
 * /announcements/home:
 *  post:
 *    summary: Crea un nuevo anuncio de los hogares / iglesias
 *    tags: [Anuncios]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Anuncio'
 *    responses:
 *      200:
 *        description: El anuncio fue creado
 *      400:
 *        description: Hubo un error en el request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
router.post('/home', async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    title: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    duration: Joi.date().required().messages({
      'date.format': 'ERROR 101 invalid date must be \'MM-DD-YYYY\'',
    }),
  }).messages({
    'any.required': 'ERROR 100 missing required fields',
    'string.empty': 'ERROR 100 empty required field',
  })

  // Validar informacion
  const result = schema.validate(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    res.status(400).json({ message })
  } else {
    try {
      const {
        title, description, duration, username,
      } = req.body
      const {
        name, email, phone, categories,
      } = (await cUsers.doc(username).get()).data()

      // Se verifica si tiene la categoria necesaria
      if (categories.includes('Iglesia') || categories.includes('Hogar')) {
        const id = tokenGenerator()
        await cAnnouncements.doc(id).set({
          id,
          contact: name,
          phone,
          email,
          title,
          description,
          toDate: duration,
          type: 'home',
          published: 0,
        })
        res.status(200)
      } else {
        res.status(403)
      }
    } catch (error) {
      res.status(500).json({ message: 'Unexpected' })
    } finally {
      res.end()
    }
  }
})

module.exports = router
