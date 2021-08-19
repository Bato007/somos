const express = require('express')
const aAdvertRouter = require('./admin/advert')
const aMediaRouter = require('./admin/media')
const aUserRouter = require('./admin/enjoyer')
const aStatisticRouter = require('./admin/statistic')

const router = express.Router()

router.use('/announcements', aAdvertRouter)

router.use('/resources', aMediaRouter)

router.use('/user', aUserRouter)

module.exports = router
