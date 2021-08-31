const express = require('express')

const {
  getCategoriesNames,
} = require('../Controller/category')

const router = express.Router()

/**
 * @swagger
 * /categories:
 *  get:
 *    summary: Retorna todos los nombres de las categorias
 *    tags: [Admin, Categorias]
 *    responses:
 *      200:
 *        description: Obtiene todas las categorias
 *        content:
 *          application/json:
 *            type: array
 *            items:
 *      500:
 *        description: Hubo un error del server
 */
router.get('/', async (req, res) => getCategoriesNames(req, res))
