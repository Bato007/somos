const express = require('express')
const aAdvertRouter = require('./admin/advert')
const aMediaRouter = require('./admin/media')
const aUserRouter = require('./admin/enjoyer')
const aStatisticRouter = require('./admin/statistic')

const router = express.Router()

router.use('/admin/announcements', aAdvertRouter)

router.use('/admin/resources', aMediaRouter)

router.use('/admin/user', aUserRouter)

module.exports = router
