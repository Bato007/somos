const express = require('express')
const Joi = require('joi')
const { cUsers } = require('../../DataBase/firebase')

const router = express.Router()

/**
 * Devuelve a todos los usuarios
 */
router.get('/', async (req, res) => {
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
})

/**
 * @swagger
 * /admin/user/{username}/categories:
 *  get:
 *    summary: Retorna todas las categorias de un usuario
 *    tags: [Admin, Categorias]
 *    parameters:
 *      - in: path
 *        name: username
 *        schema:
 *          type: string
 *        required: true
 *        description: El username del usuario
 *    responses:
 *      200:
 *        description: Obtiene todas las categorias de un usuario
 *        content:
 *          application/json:
 *            type: array
 *            items:
 *              type: string
 *      404:
 *        description: No se encontro al usuario
 *      500:
 *        description: Hubo un error del server
 */
router.get('/:username/categories', async (req, res) => {
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
})

/*
  Esta funcion recibe un Json con el siguiente formato:
  {
    username: 'ejemplo',
  }
 */
router.put('/desactivate', async (req, res) => {
  const { username } = req.body
  try {
    await cUsers.doc(username).update({
      active: false,
    })
    res.status(200).json()
  } catch (error) {
    console.log(error.message)
    res.status(400).json()
  }
})

/*
  Esta funcion recibe un Json con el siguiente formato:
  {
    username: 'ejemplo',
  }
 */
router.put('/activate', async (req, res) => {
  const { username } = req.body
  try {
    await cUsers.doc(username).update({
      active: true,
    })
    res.status(200).json()
  } catch (error) {
    console.log(error.message)
    res.status(400).json()
  }
})

router.put('/approve/:username')

router.put('/disapprove/:username')

/*
  Esta funcion recibe el username de la que se quiere borrar
  se remplaza el :username
 */
router.delete('/:username', async (req, res) => {
  const { username } = req.params
  try {
    await cUsers.doc(username).delete()
    res.status(200).json()
  } catch (error) {
    res.status(400).json()
  }
})

module.exports = router
