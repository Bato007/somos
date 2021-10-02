const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const PORT = 3001

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
      {
        url: 'https://us-central1-somos-1eb3a.cloudfunctions.net/api',
      },
    ],
  },
  apis: ['./src/Routers/*.js', './src/Routers/admin/*.js'],
}

const specs = swaggerJsDoc(options)

module.exports = {
  serve: swaggerUI.serve,
  setup: swaggerUI.setup(specs),
}
