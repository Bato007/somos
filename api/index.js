const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3001

app.use(express.json())
app.use(cors())

app.get('*', (req, res) => {
  res.json('SOMOS')
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})