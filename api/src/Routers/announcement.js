const express = require('express')

// Logica
const {
  getAll, getAllHelp, getNonPublishedhHelp, getPublishedhHelp,
  getAllHomes, getNonPublishedhHome, getPublishedhHome,
} = require('../Controller/announce')

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
 *          type: integer
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
 *          description: indica el estado del anuncio = no publicado (0), publicado (1)
 */

/**
 * @swagger
 * /announcements:
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
 */
router.get('/', (req, res) => getAll(req, res))

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
router.get('/help', (req, res) => getAllHelp(req, res))

/**
 * @swagger
 * /announcements/help/nonpublished:
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
router.get('/help/nonpublished', (req, res) => getNonPublishedhHelp(req, res))

/**
 * @swagger
 * /announcements/help/published:
 *  get:
 *    summary: Retorna todos los anuncios de los brindadores de servicio publicados
 *    tags: [Anuncios]
 *    responses:
 *      200:
 *        description: Obtiene los anuncios con published 1
 *        content:
 *          application/json:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Anuncio'
 */
router.get('/help/published', (req, res) => getPublishedhHelp(req, res))

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
router.get('/home', (req, res) => getAllHomes(req, res))

/**
 * @swagger
 * /announcements/home/nonpublished:
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
router.get('/home/nonpublished', (req, res) => getNonPublishedhHome(req, res))

/**
 * @swagger
 * /announcements/home/published:
 *  get:
 *    summary: Retorna todos los anuncios de los hogares / iglesias publicados
 *    tags: [Anuncios]
 *    responses:
 *      200:
 *        description: Obtiene los anuncios con published 1
 *        content:
 *          application/json:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Anuncio'
 */
router.get('/home/published', (req, res) => getPublishedhHome(req, res))

module.exports = router
