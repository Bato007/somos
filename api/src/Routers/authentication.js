const express = require('express')
const bcrypt = require('bcryptjs')
const pool = require('../DataBase/database')

const router = express.Router()

/*
  Esta funcion recibe un Json con el siguiente formato:
  {
    username: 'ejemplo',
    password: 'ejemplo'
  }
  Al recibirlo verifica si esta en la base de datos si no esta
  manda manda ERROR 101 y si las contraseñas no coinciden manda
  ERROR 102 la siguiente manera:
  {
    username: 'ERROR 102',
    name: '',
    isSOMOS: false,
  }
  Si no hay errores entonces manda la información con el mismo formato.
*/
router.post('/signin', async (req, res) => {
  const answer = {
    username: '',
    name: '',
    isSOMOS: false,
  }

  try {
    const { username, password } = req.body

    const user = await pool.query(`
      SELECT *
      FROM somos_user
      WHERE username = $1;
    `, [username])

    // Verificando que exista el user
    if (user.rowCount < 1) {
      throw { message: 'ERROR 101' }
    }

    if (bcrypt.compareSync(password,user.rows[0].password) === false) {
      throw { message: 'ERROR 102' }
    }

    const categories = await pool.query(`
      SELECT *
      FROM user_category
      WHERE username = $1;
    `, [username])

    if (categories.rowCount > 0) {
      categories.rows.map((row) => {
        const cat = row.category
        if (cat === 'somos') {
          answer.isSOMOS = true
        }
        return cat
      })
    }

    answer.username = user.rows[0].username
    answer.name = user.rows[0].name
  } catch (error) {
    answer.username = error.message
  } finally {
    res.json(answer)
  }
})

/*
  Esta funcion recibe un Json con el siguiente formato:
  {
    username: 'ejemplo',
    password: 'ejemplo',
    confirm: 'ejemplo',
    email: 'ejemplo',
    name: 'ejemplo',
    phone: 01234567
    workplace: 'ejemplo',
    residence: 'ejemplo',
    church: 'ejemplo',
    categories: ['categoria1', 'categoria2', ..., 'categorian']
  }
  Si el usuario ya existe manda ERROR 103
  Si las contraseñas no coinciden ERROR 104
  Si el email, name, phone, workplace o residence son null
  entonces tira ERROR 105 o ERROR 106 o ERROR 107 o ERROR 108
  o ERROR 109 respectivamente.
  Si alguna categoria no existe da ERROR 110

  El sistema responde de la siguiente manera:
  {
    status: 'ERROR 103'
  }
  Si no hay errores entonces manda la información con el mismo formato
  con la palabra DONE
*/
router.post('/signup', async (req, res) => {
  const answer = {
    status: '',
  }
  const client = await pool.connect()

  try {
    const {
      username, password, confirm, email, name,
      phone, workplace, residence, church, categories,
    } = req.body

    if (password !== confirm) {
      throw { message: 'no_equal_password' }
    }

     // Encrypting Password 
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)

    // Empezando a meter el usuario
    await client.query('BEGIN;')

    await client.query(`
      INSERT INTO somos_user VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8);
    `, [username, hash, email, name, phone,
      workplace, residence, church])

    // Agregando las
    await client.query(`
      SELECT * FROM insert_categories($1, $2);
    `, [username, categories])

    await client.query('COMMIT;')
    answer.status = 'DONE'
  } catch (error) {
    await client.query('ROLLBACK;')
    const err = error.message

    // Verificando que error es
    if (err.indexOf('somos_user_pkey') !== -1) {
      answer.status = 'ERROR 103'
    } else if (err.indexOf('no_equal_password') !== -1) {
      answer.status = 'ERROR 104'
    } else if (err.indexOf('«email»') !== -1) {
      answer.status = 'ERROR 105'
    } else if (err.indexOf('«name»') !== -1) {
      answer.status = 'ERROR 106'
    } else if (err.indexOf('phone') !== -1) {
      answer.status = 'ERROR 107'
    } else if (err.indexOf('workplace') !== -1) {
      answer.status = 'ERROR 108'
    } else if (err.indexOf('residence') !== -1) {
      answer.status = 'ERROR 109'
    } else if (err.indexOf('«fk_category_user»') !== -1) {
      answer.status = 'ERROR 110'
    } else {
      answer.status = 'ERROR'
    }
  } finally {
    res.json(answer)
  }
})

module.exports = router
