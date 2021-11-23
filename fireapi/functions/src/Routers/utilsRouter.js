const express = require('express')

const { cCategories } = require('../DataBase/firebase')
const { cTags } = require('../DataBase/firebase')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Indica similitudes entre recursos
 */

/**
 * @swagger
 * /categories:
 *  get:
 *    summary: Retorna todas las categorias con sus usuarios
 *    tags: [Categorias]
 *    responses:
 *      200:
 *        description: Obtiene todas las categorias con los usuarios que pertenecen
 *        content:
 *          application/json:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Category'
 *      500:
 *        description: Hubo un error del server
 */
router.get('/categories', async (req, res) => {
  try {
    const categories = await cCategories.get()
    const aux = []
    categories.forEach((category) => {
      aux.push(category.data())
    })
    res.status(200).json(aux)
  } catch (error) {
    res.sendStatus(500)
  }
})

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
router.get('/categories/name', async (req, res) => {
  try {
    const categories = await cCategories.get()
    const aux = []
    categories.forEach((category) => {
      aux.push(category.id)
    })
    res.status(200).json(aux)
  } catch (error) {
    res.sendStatus(500)
  }
})

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
router.get('/tags/name', async (req, res) => {
  try {
    const tags = await cTags.get()
    const aux = []
    tags.forEach((tag) => {
      aux.push(tag.id)
    })
    res.status(200).json(aux)
  } catch (error) {
    res.sendStatus(500)
  }
})

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
router.get('/tags', async (req, res) => {
  try {
    const tags = await cTags.get()
    const aux = []
    tags.forEach((tag) => {
      aux.push(tag.data())
    })
    res.status(200).json(aux)
  } catch (error) {
    res.sendStatus(500)
  }
})

module.exports = router
