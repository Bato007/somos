const express = require('express')

// Logica
const {
  getAll, getAllHelp, getNonPublishedhHelp, getPublishedhHelp,
  getAllHomes, getNonPublishedhHome, getPublishedhHome,
} = require('../Controller/announce')

const router = express.Router()

/**
 * Los objetos para estas rutas tienen la siguiente
 * estrucutra:
 * {
 *  id: 'ejemplo',
 *  contact: 'ejemplo',
 *  phone: 12315123,
 *  email: 'ejemplo@gmail',
 *  title: 'ejemplo',
 *  description: 'ejemplo',
 *  toDate: '2021-04-01',
 *  published: true,
 *  type: 'ejemplo'
 * }
 */

/**
 * Obtiene todos los anuncios de la plataforma
 */
router.get('/', (req, res) => getAll(req, res))

/**
 * Obtiene todos los anuncios de la categoria help
 */
router.get('/help', (req, res) => getAllHelp(req, res))

/**
 * Obtiene los anuncios de help no publicados
 */
router.get('/help/nonpublished', (req, res) => getNonPublishedhHelp(req, res))

/**
 * Obtiene los anuncios de help publicados
 */
router.get('/help/published', (req, res) => getPublishedhHelp(req, res))

/**
 * Obtiene todos los anuncios de la categoria home
 */
router.get('/home', (req, res) => getAllHomes(req, res))

/**
  * Obtiene los anuncios de home no publicados
  */
router.get('/home/nonpublished', (req, res) => getNonPublishedhHome(req, res))

/**
  * Obtiene los anuncios de home publicados
  */
router.get('/home/published', (req, res) => getPublishedhHome(req, res))

module.exports = router
