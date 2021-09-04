const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const app = express()
const PORT = 3001

const adminRouter = require('./src/Routers/admin')
const authenticationRouter = require('./src/Routers/authentication')
const resourcesRouter = require('./src/Routers/resources')
const announcementRouter = require('./src/Routers/announcement')
const userRouter = require('./src/Routers/usermanagment')

const { authorizate } = require('./src/Middleware/authorization')

app.use(cors())
app.use(express.json())

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

const specs = swaggerJsDoc(options)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

// app.use('/', authorizate)

// Todas las rutas validas para administrador
app.use('/admin', adminRouter)

// Todas las rutas validas para cualquiera
app.use('/authentication', authenticationRouter)
app.use('/resources', resourcesRouter)
app.use('/announcements', announcementRouter)
app.use('/user', userRouter)

// Ahora se tira error de que no encontro la ruta
app.use((req, res) => {
  res.status(404).json({ message: 'NOT FOUND' })
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

app.use(PORT, (req, res) => {
  res.send({ message: 'Hola mundo' })
})

