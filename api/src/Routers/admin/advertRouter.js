const express = require('express')
const { cAnnouncements } = require('../../DataBase/firebase')
const { sendMail } = require('../../Middleware/services')

const router = express.Router()

/**
 * @swagger
 * /admin/announcements:
 *  get:
 *    summary: Retorna todos los anuncios
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
    const tempAnnouncements = await cAnnouncements.get()
    const announcements = []
    tempAnnouncements.forEach((announcement) => {
      const data = announcement.data()
      let { toDate } = data
      toDate = toDate.toDate()
      announcements.push({ ...data, toDate })
    })
    res.status(200).json(announcements)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Unexpected' })
  }
})

/**
 * @swagger
 * /admin/announcements/nonpublished:
 *  get:
 *    summary: Retorna todos los anuncios no publicados
 *    tags: [Anuncios]
 *    responses:
 *      200:
 *        description: Obtiene los anuncios con published 0
 *        content:
 *          application/json:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Anuncio'
 */
router.get('/nonpublished', async (req, res) => {
  try {
    const tempAnnouncements = await cAnnouncements.where('published', '==', 0).get()
    const announcements = []
    tempAnnouncements.forEach((announcement) => {
      const data = announcement.data()
      let { toDate } = data
      toDate = toDate.toDate()
      announcements.push({ ...data, toDate })
    })
    res.statusCode = 200
    res.json(announcements)
  } catch (error) {
    res.statusCode = 500
    res.json({ message: 'Unexpected' })
  }
})

/**
 * @swagger
 * /admin/announcements/help/nonpublished:
 *  get:
 *    summary: Retorna todos los anuncios de los brindadores de servicio no publicados
 *    tags: [Anuncios]
 *    responses:
 *      200:
 *        description: Obtiene los anuncios con published 0
 *        content:
 *          application/json:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Anuncio'
 */
router.get('/help/nonpublished', async (req, res) => {
  try {
    const aux = cAnnouncements.where('type', '==', 'help')
    const tempAnnouncements = await aux.where('published', '==', 0).get()
    const announcements = []
    tempAnnouncements.forEach((announcement) => {
      const data = announcement.data()
      let { toDate } = data
      toDate = toDate.toDate()
      announcements.push({ ...data, toDate })
    })
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
})

/**
 * @swagger
 * /admin/announcements/home/nonpublished:
 *  get:
 *    summary: Retorna todos los anuncios de los hogares / iglesias no publicados
 *    tags: [Anuncios]
 *    responses:
 *      200:
 *        description: Obtiene los anuncios con published 0
 *        content:
 *          application/json:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Anuncio'
 */
router.get('/home/nonpublished', async (req, res) => {
  try {
    const aux = cAnnouncements.where('type', '==', 'home')
    const tempAnnouncements = await aux.where('published', '==', 0).get()
    const announcements = []
    tempAnnouncements.forEach((announcement) => {
      const data = announcement.data()
      let { toDate } = data
      toDate = toDate.toDate()
      announcements.push({ ...data, toDate })
    })
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
})

/**
 * @swagger
 * /admin/announcements/accept/{id}:
 *  put:
 *    summary: Acepta un anuncio
 *    tags: [Admin, Anuncios]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: El id del anuncio
 *    responses:
 *      200:
 *        description: El anuncio fue publicado
 *      404:
 *        description: El id no existe
 */
router.put('/accept/:id', async (req, res) => {
  const { id } = req.params
  try {
    await cAnnouncements.doc(id).update({
      published: 1,
    })
    sendMail()
    res.statusCode = 200
    // Se manda el mail
  } catch (error) {
    res.statusCode = 404
  } finally {
    res.end()
  }
})

/**
 * @swagger
 * /admin/announcements/deny/{id}:
 *  put:
 *    summary: Rechaza un anuncio
 *    tags: [Admin, Anuncios]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: El id del anuncio
 *    responses:
 *      200:
 *        description: El anuncio fue rechazado
 *      404:
 *        description: El id no existe
 */
router.put('/deny/:id', async (req, res) => {
  const { id } = req.params
  try {
    await cAnnouncements.doc(id).update({
      published: 2,
    })
    sendMail()
    res.statusCode = 200
    // Se manda el mail
  } catch (error) {
    res.statusCode = 404
  } finally {
    res.end()
  }
})

/**
 * @swagger
 * /admin/announcements/{id}:
 *  delete:
 *    summary: Elimina un anuncio
 *    tags: [Admin, Anuncios]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: El id del anuncio
 *    responses:
 *      200:
 *        description: El anuncio fue creado
 *      404:
 *        description: El anuncio no se encontro
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await cAnnouncements.doc(id).delete()
    res.statusCode = 200
  } catch (error) {
    res.statusCode = 400
  } finally {
    res.end()
  }
})

module.exports = router
