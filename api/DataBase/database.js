const { Pool } = require('pg')
const credential = require('./credentials.json')

const pool = new Pool(credential)

module.exports = pool

/**
credentials.json
{
  "user": "postgres",
  "host": "localhost",
  "database": "somos",
  "password": "",
  "port": 5432
}
 */
