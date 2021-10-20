const express = require('express')
const Joi = require('joi')
const customJoi = Joi.extend(require('joi-phone-number'))
const keyGen = require('random-key')
const tokenGenerator = require('uuid-v4')
const { cUsers, cKeys, cAnnouncements } = require('../DataBase/firebase')

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
    somoskey: '',
  }
  Si no hay errores entonces manda la información con el mismo formato.
*/
/**
 * @swagger
 * /login:
 *  post:
 *    summary: Logea al usuario
 *    tags: [Anuncios]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Anuncio'
 *    responses:
 *      200:
 *        description: El anuncio fue creado
 *      400:
 *        description: Hubo un error en el request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
router.post('/login', async (req, res) => {
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
    res.statusCode = 200
    res.json({
      username, name, isSOMOS, somoskey,
    })
  } catch (error) {
    res.statusCode = 400
    switch (error.message) {
      case '101':
        res.json({ username: 'ERROR 101' })
        break
      case '102':
        res.json({ username: 'ERROR 102' })
        break
      case '103':
        res.json({ username: 'ERROR 103' })
        break
      default:
        res.json({ username: 'ERROR' })
        break
    }
  }
})

/**
 * Account-Recovery
 * 
 */
router.post('/recovery', async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(5).required()
  })

  //Valida informacion
  const result = schema.validate(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    res.status(400).json({ email: 'ERROR', name: message })
  } else {
    // Localiza el usuario que desea cambiar contraseña
    try{
      const { email } = req.body
      const users = await cUsers.where('email', '==', email).get()
      if (users.empty) {
        throw { message: '101' }
      }

      // Extrae informacion del usuario
      const user = users.data()
      const { username, name } = user
      res.statusCode = 200
      // Genera token ¿?
      const token = keyGen.generate(20)

      res.json({
        username, name, token,
      })
    } catch (error){
      res.statusCode = 400
      switch (error.message) {
        case '101':
          res.json({ email: 'ERROR 101' })
          break
        default:
          res.json({ email: 'ERROR' })
          break
      }
    }
  }
})

router.put('/recovery/token', async (req, res) => {
  const schema = Joi.object({
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')),
  token: Joi.string().min(6).required(),
  })

  //Valida informacion
  const result = schema.validate(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    res.statusCode = 400
    res.json({ password: 'ERROR', name: message })
  } else {
    try {
      const {
        password, confirmPassword, token,
      } = req.body
      const { username, givenToken } = req.headers
      
      // Verifica el token dado con el ingresado
      if (givenToken !== token) {
        res.statusCode = 401
        res.end()
        // Verifica la contraseña con la confirmacion
      } else if (password !== confirmPassword) {
        res.statusCode = 400
        res.end()
      } else {
        await cUsers.doc(username).update({
          password,
        })
        res.statusCode = 200
        res.end()
      }
    } catch (error) {
      res.statusCode = 500
      res.end()
    }
  }
})


/**
 * @swagger
 * /announcements/help:
 *  post:
 *    summary: Crea un nuevo anuncio de los brindadores de servicio
 *    tags: [Anuncios]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Anuncio'
 *    responses:
 *      200:
 *        description: El anuncio fue creado
 *      400:
 *        description: Hubo un error en el request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
router.post('/announcements/help', async (req, res) => {
  const schema = Joi.object({
    contact: Joi.string().min(1).required(),
    phone: customJoi.string()
      .phoneNumber({
        defaultCountry: 'GT',
        format: 'national',
        strict: false, // Bajo visor
      })
      .required(),
    email: Joi.string()
      .min(6) // Se espera valores minimos de 1 caracter + @ + emailProvider + terminacion.min(3)
      .email({ tlds: { allow: false } })
      .required(),
    title: Joi.string().min(10).required(),
    description: Joi.string().min(10).required(),
    date: Joi.date().required(),
  })

  // Validar informacion
  const result = schema.validate(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    res.status(400).json({ message })
  }

  try {
    const {
      contact, phone, email, title, description, date,
    } = req.body

    const id = tokenGenerator()
    await cAnnouncements.doc(id).set({
      id,
      contact,
      phone,
      email,
      title,
      description,
      toDate: date,
      type: 'help',
      published: 0,
    })
    res.status(200).json({ message: 'Added' })
  } catch (error) {
    res.status(500).json({ message: 'Unexpected' })
  }
})

module.exports = router
