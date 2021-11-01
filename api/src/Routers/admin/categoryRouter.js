const express = require('express')
const Joi = require('joi')

const { cCategories } = require('../../DataBase/firebase')

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
router.post('/', async (req, res) => {
  const schema = Joi.object({
    categories: Joi.array().min(1).required(),
  })

  // Validar informacino
  const result = schema.validate(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    res.status(400).json({ message })
  } else {
    try {
      const { categories } = req.body
      // Para cada categoria se agrega el usuario
      const users = []
      categories.forEach(async (category) => {
        // Se verifica que no esta en firebase
        const tempCategory = await cCategories.doc(category).get()
        if (!tempCategory.exists) {
          cCategories.doc(category).set({
            category,
            users,
          })
        }
      })
      res.sendStatus(200)
    } catch (error) {
      res.sendStatus(500)
    }
  }
})

module.exports = router
