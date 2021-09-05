const Joi = require('joi')
const keyGen = require('random-key')
const { cUsers, cKeys, FieldValue } = require('../DataBase/firebase')

const signIn = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(1).required(),
    password: Joi.string().min(8).required(),
  })

  // Validar informacion
  const result = schema.validate(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    res.status(400).json({ username: 'ERROR', name: message })
  } else {
    try {
      const { username, password } = req.body
      let isSOMOS = false

      const users = await cUsers.doc(username).get()
      // Verificando que exista el user
      if (users.empty) {
        throw { message: '101' }
      }

      const user = users.data()

      // Se verifica si esta activo o no
      if (!user.active) {
        throw { message: '103' }
      }

      // Verifico que la contraseña
      if (user.password !== password) {
        throw { message: '102' }
      }

      // Verifico si es somos o no
      user.categories.forEach((category) => {
        if (category === 'somos') {
          isSOMOS = true
        }
      })

      // Ahora se genera la key
      const somoskey = keyGen.generate(20)
      const expires = new Date()
      expires.setDate(expires.getDate() + 1)

      cKeys.doc(username).set({
        expires,
        isSomos: isSOMOS,
        somoskey,
      })

      const { name } = user
      res.status(200).json({
        username, name, isSOMOS, somoskey,
      })
    } catch (error) {
      const { message } = error
      switch (message) {
        case '101':
          res.status(400).json({ username: 'ERROR 101' })
          break
        case '102':
          res.status(400).json({ username: 'ERROR 102' })
          break
        case '103':
          res.status(400).json({ username: 'ERROR 103' })
          break
        default:
          res.status(400).json({ username: 'ERROR' })
          break
      }
    }
  }
}

const signUp = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(1).required(),
    password: Joi.string().min(8).required(),
    confirm: Joi.string().required().valid(Joi.ref('password')),
    email: Joi.string().email().required(),
    name: Joi.string().min(3).required(),
    phone: Joi.string(),
    workplace: Joi.string(),
    residence: Joi.string().required(),
    church: Joi.string(),
    categories: Joi.array().min(1).required(),
  })

  // Validar informacion
  const result = schema.validate(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    res.status(400).json({ message })
  } else {
    const answer = {
      message: '',
    }

    try {
      const {
        username, password, email, name,
        phone, workplace, residence, church, categories,
      } = req.body

      // Se mete el usuario
      cUsers.doc(username).set({
        username,
        password,
        email,
        name,
        phone,
        workplace,
        residence,
        church,
        categories,
        active: true,
      })
      answer.message = 'DONE'
      res.status(200).json(answer)
    } catch (error) {
      const err = error.message
      // Verificando que error es
      if (err.indexOf('somos_user_pkey') !== -1) {
        answer.message = 'ERROR 103'
      } else if (err.indexOf('no_equal_password') !== -1) {
        answer.message = 'ERROR 104'
      } else if (err.indexOf('«email»') !== -1) {
        answer.message = 'ERROR 105'
      } else if (err.indexOf('«name»') !== -1) {
        answer.message = 'ERROR 106'
      } else if (err.indexOf('phone') !== -1) {
        answer.message = 'ERROR 107'
      } else if (err.indexOf('workplace') !== -1) {
        answer.message = 'ERROR 108'
      } else if (err.indexOf('residence') !== -1) {
        answer.message = 'ERROR 109'
      } else if (err.indexOf('«fk_category_user»') !== -1) {
        answer.message = 'ERROR 110'
      } else {
        answer.message = 'ERROR'
      }
      res.status(400).json(answer)
    }
  }
}

const getAllUsers = async (req, res) => {
  try {
    const added = []
    const users = await cUsers.get()
    users.forEach((user) => {
      const {
        username, active, email, name, categories,
      } = user.data()
      added.push({
        username,
        active,
        email,
        name,
        categories,
      })
    })
    res.status(200).json(added)
  } catch (error) {
    console.log(error.message)
    res.status(400).json()
  }
}

const getUserCategories = async (req, res) => {
  try {
    const { username } = req.params
    const tempUser = await cUsers.doc(username).get()
    if (!tempUser.exists) {
      res.sendStatus(404)
    } else {
      const { categories } = tempUser.data()
      res.status(200).json(categories)
    }
  } catch (error) {
    res.sendStatus(500)
  }
}

const getCategoriesPerUser = async (req, res) => {
  try {
    const tempUsers = await cUsers.get()
    const users = []
    tempUsers.forEach((user) => {
      const { username, categories } = user.data()
      users.push({
        username,
        type: categories,
      })
    })

    res.status(200).json(users)
  } catch (error) {
    console.log(error.message)
    res.sendStatus(500)
  }
}

const desactivateUser = async (req, res) => {
  const { username } = req.body
  try {
    await cUsers.doc(username).update({
      active: false,
      desactiveDate: new Date(),
    })
    res.status(200).json()
  } catch (error) {
    console.log(error.message)
    res.status(400).json()
  }
}

const activateUser = async (req, res) => {
  const { username } = req.body
  try {
    await cUsers.doc(username).update({
      active: true,
      desactiveDate: FieldValue.delete(),
    })
    res.status(200).json()
  } catch (error) {
    console.log(error.message)
    res.status(400).json()
  }
}

const deleteUser = async (req, res) => {
  const { username } = req.params
  try {
    await cUsers.doc(username).delete()
    res.status(200).json()
  } catch (error) {
    res.status(400).json()
  }
}

module.exports = {
  signIn,
  signUp,
  getAllUsers,
  getUserCategories,
  getCategoriesPerUser,
  desactivateUser,
  activateUser,
  deleteUser,
}
