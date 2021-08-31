const express = require('express')

const {
  getCategories,
  getCategoriesNames,
  createCategories,
} = require('../../Controller/category')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Manejo de categorias del API
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      properties:
 *        category:
 *          type: string
 *          description: Indica el nombre de la categoria
 *        users:
 *          type: array
 *          description: Usuarios que pertenecen a esa categoria
 *      example:
 *        category: iglesia
 *        users: [bato007, lucz]
 */

/**
 * @swagger
 * /admin/categories:
 *  get:
 *    summary: Retorna todas las categorias con sus usuarios
 *    tags: [Admin, Categorias]
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
router.get('/names', async (req, res) => getCategories(req, res))

/**
 * @swagger
 * /admin/categories:
 *  post:
 *    summary: Agrega nuevas categorias
 *    tags: [Admin, Categorias]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              categories:
 *                type: array
 *                description: Array con las categorias que se quieren agregar
 *            example:
 *              categories: [nueva1, nueva2, nueva3]
 *    responses:
 *      200:
 *        description: Se agregaron las categorias
 *      400:
 *        description: Hubo un error en el request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      500:
 *        description: Hubo un error del server
 */
router.post('/', async (req, res) => createCategories(req, res))

module.exports = router
