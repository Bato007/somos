const express = require('express')
const { cAnnouncements } = require('../../DataBase/firebase')

const router = express.Router()

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
 *      400:
 *        description: El id no existe
 *      500:
 *        description: Hubo un error en el server
 */
router.put('/accept/:id')

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
 *      500:
 *        description: Hubo un error en el server
 */
router.delete('/:id')

module.exports = router
