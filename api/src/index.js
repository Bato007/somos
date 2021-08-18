const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3001

const adminRouter = require('./Routers/admin')
const authenticationRouter = require('./Routers/authentication')
const resourcesRouter = require('./Routers/resources')
const announcementRouter = require('./Routers/announcement')
const userRouter = require('./Routers/usermanagment')

const { authorizate } = require('./Middleware/authorization')

app.use(express.json())
app.use(cors())

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
