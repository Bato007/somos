const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// Local imports
const { serve, setup } = require('./swagger.config')

// Router Imports
const publicRouter = require('./src/Routers/publicRouter')

// Usuarios de SOMOS
const userRouter = require('./src/Routers/userRouter')
const resourcesRouter = require('./src/Routers/resourcesRouter')
const advertRouter = require('./src/Routers/advertRouter')
const utilRouter = require('./src/Routers/utilsRouter')

// Administradores de SOMOS
const adminUserRouter = require('./src/Routers/admin/userRouter')
const adminResourcesRouter = require('./src/Routers/admin/resourcesRouter')
const adminAdvertRouter = require('./src/Routers/admin/advertRouter')
const adminCategoryRouter = require('./src/Routers/admin/categoryRouter')
const adminTagsRouter = require('./src/Routers/admin/tagRouter')

// Seguirdad
const { authorizate } = require('./src/Middleware/authorization')

app.get('/', (req, res) => {
  res.statusCode = 200
  res.json({ message: 'Develop' })
})

// Routers Sin autenticacion
app.use('/', publicRouter)
app.use('/docs', serve, setup)

// Routers Protegidos a los usuarios
app.use('/', authorizate)
app.use('/user', userRouter)
app.use('/resources', resourcesRouter)
app.use('/announcements', advertRouter)
app.use('/', utilRouter)

// Routers protegidos a los admins
app.use('/admin/user', adminUserRouter)
app.use('/admin/resources', adminResourcesRouter)
app.use('/admin/announcements', adminAdvertRouter)
app.use('/admin/categories', adminCategoryRouter)
app.use('/admin/tags', adminTagsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'NOT FOUND' })
})

exports.api = functions.https.onRequest(app)
