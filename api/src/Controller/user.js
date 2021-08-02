const Joi = require('joi')
const { cUsers, FieldValue } = require('../DataBase/firebase')

const signIn = async (req, res) => {
  const answer = {
    username: '',
    name: '',
    isSOMOS: false,
  }

  try {
    const { username, password } = req.body

    const users = await cUsers.doc(username).get()
    // Verificando que exista el user
    if (users.empty) {
      res.status(400)
      throw { message: 'ERROR 101' }
    }

    const user = users.data()

    // Se verifica si esta activo o no
    if (!user.active) {
      res.status(400)
      throw { message: 'ERROR 103' }
    }

    // Verifico que la contraseña
    if (user.password !== password) {
      res.status(400)
      throw { message: 'ERROR 102' }
    }

    // Verifico si es somos o no
    user.categories.forEach((category) => {
      if (category === 'somos') {
        answer.isSOMOS = true
      }
    })

    answer.username = username
    answer.name = user.name
  } catch (error) {
    answer.username = error.message
  } finally {
    res.json(answer)
  }
}

const signUp = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(1).required(),
    password: Joi.string().min(8).required(),
    confirm: Joi.string().required().valid(Joi.ref('password')),
    email: Joi.string().min(5).required(),
    name: Joi.string().min(3).required(),
    phone: Joi.number().required(),
    workplace: Joi.string().required(),
    residence: Joi.string().required(),
    church: Joi.string(),
    categories: Joi.array().min(1).required(),
  })

  // Validar informacion
  const result = schema.validate(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    res.status(400).json({ message })
  }

  const answer = {
    status: '',
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
    answer.status = 'DONE'
    res.status(200)
  } catch (error) {
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
    res.status(400)
  } finally {
    res.json(answer)
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
  desactivateUser,
  activateUser,
  deleteUser,
}
