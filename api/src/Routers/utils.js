const express = require('express')

const {
  getCategoriesNames,
} = require('../Controller/category')

const {
  getTags,
  getTagsName,
} = require('../Controller/tags')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Indica similitudes entre recursos
 */

/**
 * @swagger
 * /categories/name:
 *  get:
 *    summary: Retorna todos los nombres de las categorias
 *    tags: [Categorias]
 *    responses:
 *      200:
 *        description: Obtiene todas las categorias
 *        content:
 *          application/json:
 *            type: array
 *      500:
 *        description: Hubo un error del server
 */
router.get('/categories/name', async (req, res) => getCategoriesNames(req, res))

/**
 * @swagger
 * /tags/name:
 *  get:
 *    summary: Retorna todos los nombres de las tags existentes
 *    tags: [Tags]
 *    responses:
 *      200:
 *        description: Obtiene todas las tags
 *        content:
 *          application/json:
 *            type: array
 *      500:
 *        description: Hubo un error del server
 */
router.get('/tags/name', async (req, res) => getTagsName(req, res))

/**
 * @swagger
 * /tags:
 *  get:
 *    summary: Retorna las tags con los recursos
 *    tags: [Tags]
 *    responses:
 *      200:
 *        description: Obtiene todos los recursos de la tag
 *        content:
 *          application/json:
 *            type: array
 *      500:
 *        description: Hubo un error del server
 */
router.get('/tags', async (req, res) => getTags(req, res))

module.exports = router
