const express = require('express')
const aAdvertRouter = require('./admin/advert')
const aMediaRouter = require('./admin/media')
const aUserRouter = require('./admin/enjoyer')
const aCategories = require('./admin/categories')
const aTags = require('./admin/tag')
const aStatisticRouter = require('./admin/statistic')
const { route } = require('./announcement')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Las acciones que solo un administrador tiene permiso
 */

router.use('/announcements', aAdvertRouter)

router.use('/resources', aMediaRouter)

router.use('/user', aUserRouter)

router.use('/categories', aCategories)

router.use('/tags', aTags)

module.exports = router
