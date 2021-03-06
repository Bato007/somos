const express = require('express')
const Joi = require('joi')

const { cTags } = require('../../DataBase/firebase')

const router = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    Tag:
 *      type: object
 *      properties:
 *        tag:
 *          type: string
 *          description: Indica el nombre del tag
 *        resources:
 *          type: array
 *          description: Contiene los recursos asociados a esta tag
 *      example:
 *        tag: iglesia
 *        users: [{id - 4d07654e-a638-4fd5-864b-c6f9ea188501, title - sirve :d, type - pdf}]
 */

/**
 * @swagger
 * /admin/tags:
 *  post:
 *    summary: Agrega nuevas tags
 *    tags: [Admin, Tags]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              tags:
 *                type: array
 *                description: Array con las tags que se quieren agregar
 *            example:
 *              tags: [nueva1, nueva2, nueva3]
 *    responses:
 *      200:
 *        description: Se agregaron las tags
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
    tags: Joi.array().min(1).required(),
  })

  // Validar informacino
  const result = schema.validate(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    res.status(400).json({ message })
  } else {
    try {
      const { tags } = req.body
      // Para cada categoria se agrega el usuario
      const resources = []
      tags.forEach(async (tag) => {
        // Se verifica que no esta en firebase
        const tempCategory = await cTags.doc(tag).get()
        if (!tempCategory.exists) {
          cTags.doc(tag).set({
            tag,
            resources,
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
