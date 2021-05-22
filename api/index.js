const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3001

const authenticationRouter = require('./Routers/authentication')
const resourcesRouter = require('./Routers/resources')

app.use(express.json())
app.use(cors())

app.use('/authentication', authenticationRouter)
app.use('/resources', resourcesRouter)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
