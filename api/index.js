const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const app = express()
const PORT = 3001

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

const { sendMail } = require('./src/Middleware/services')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SOMOS API',
      version: '1.0.0',
      description: 'Documentacion del api',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./src/Routers/*.js', './src/Routers/admin/*.js'],
}

app.use(cors())
app.use(express.json())

const specs = swaggerJsDoc(options)
app.get('/test', sendMail)

// Routers Sin autenticacion
app.use('/', publicRouter)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

// Routers Protegidos a los usuarios
// app.use('/', authorizate)
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

// Ahora se tira error de que no encontro la ruta
app.use((req, res) => {
  res.status(404).json({ message: 'NOT FOUND' })
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
