const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3001

const authenticationRouter = require('./Routers/authentication')
const resourcesRouter = require('./Routers/resources')
const announcementRouter = require('./Routers/announcement')

app.use(express.json())
app.use(cors())

app.use('/authentication', authenticationRouter)
app.use('/resources', resourcesRouter)
app.use('/announcements', announcementRouter)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
