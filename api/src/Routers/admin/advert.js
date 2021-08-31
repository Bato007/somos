const express = require('express')

const router = express.Router()

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
