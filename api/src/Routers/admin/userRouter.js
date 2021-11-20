const express = require('express')
const Joi = require('joi')
const {
  cUsers, cPetitions, cKeys, cResources,
} = require('../../DataBase/firebase')
const { valPassword, valRegion } = require('../../Middleware/validation')
const {
  sendMail, makeLower, createCategories, deleteCategories, getArrayDiff,
} = require('../../Middleware/services')
const { acceptPetitionM, rejectPetitionM } = require('../../../mails/messages.json')

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
        phone, workplace, church,
      } = req.body
      let { categories, residence } = req.body
      categories = makeLower(categories)

      // Verificando que el usuario no este ingresado
      const users = await cUsers.where('username', '==', username).get()
      if (!users.empty) {
        throw { message: 'User Exists' }
      }

      // Se valida la residencia
      residence = valRegion(residence)
      if (!residence) { throw { message: 'Residence not Valid' } }
      if (!valPassword(password)) { throw { message: 'No Valid Pass' } }

      const response = createCategories(categories, username)
      if (!response) { throw { message: 'ERROR' } }
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

      // Ahora se agregan las categorias que no existen con su usuario

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
      } else if (err === 'User Exists') {
        answer.message = 'ERROR 111'
      } else if (err === 'Residence not Valid') {
        answer.message = 'ERROR 112'
      } else if (err === 'No Valid Pass') {
        answer.message = 'ERROR 113'
      } else {
        answer.message = 'ERROR'
      }
      res.status(400).json(answer)
    }
  }
})

router.put('/other/category', async (req, res) => {
  const { username } = req.body
  let { categories } = req.body
  try {
    const fUser = (await cUsers.doc(username).get()).data()
    categories = makeLower(categories)

    // Ahora verifico las diferencias
    const { added, removed } = getArrayDiff(fUser.categories, categories)

    createCategories(added, username)
    deleteCategories(removed, username)

    await cUsers.doc(username).update({ categories })
    res.status(200).end()
  } catch (error) {
    res.status(500).end()
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

router.get('/petitions', async (req, res) => {
  try {
    const temp = await cPetitions.get()
    if (!temp.empty) {
      const petitions = []
      temp.forEach((element) => {
        const data = cUsers.doc(element.id).get().then((info) => info.data()).then((p) => p)
        // console.log(username, name)
        console.log(data)
        petitions.push({
          username: element.id,
          ...element.data(),
        })
      })
      res.status(200).json(petitions)
    } else {
      res.status(404).json({ message: 'Empty petitions' })
    }
  } catch (error) {
    res.status(500).end()
  }
})

router.put('/approve/:username', async (req, res) => {
  try {
    const { username } = req.params
    const petition = (await cPetitions.doc(username).get()).data()
    if (petition.empty) {
      res.status(404).end()
    } else {
      // Se enconro el request
      const { added, removed } = petition
      const { categories, email } = (await cUsers.doc(username).get()).data()

      added.forEach((element) => {
        categories.push(element)
      })
      removed.forEach((element) => {
        const index = categories.indexOf(element)
        categories.splice(index, 1)
      })

      // Actualizmos en la base de datos las categorias
      createCategories(added, username)
      deleteCategories(removed, username)

      await cUsers.doc(username).update({
        categories,
      })
      await cPetitions.doc(username).delete()

      const {
        subject, text, add, remove, adds, removes, finish,
      } = acceptPetitionM
      let message = text

      // Mensaje cuando se agreguen categorias
      if (added.length === 1) {
        message += add.replace('$1', added[0])
      } else if (added.length > 1) {
        let addedT = ''
        added.forEach((element) => { addedT += element })
        message += adds.replace('$1', addedT)
      }

      // Mensaje cuando se quita
      if (removed.length === 1) {
        message += remove.replace('$1', removed[0])
      } else if (removed.length > 1) {
        let removedT = ''
        removed.forEach((element) => { removedT += element })
        message += removes.replace('$1', removedT)
      }
      message += finish
      sendMail(email, subject, message)

      res.status(200).end()
    }
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
})

router.put('/disapprove/:username', async (req, res) => {
  try {
    const { username } = req.params
    const petition = (await cPetitions.doc(username).get()).data()
    if (petition.empty) {
      res.status(404).end()
    } else {
      await cPetitions.doc(username).delete()
      const { email } = (await cUsers.doc(username).get()).data()
      res.status(200).end()
      const { subject, text } = rejectPetitionM
      sendMail(email, subject, text)
    }
  } catch (error) {
    res.status(500).end()
  }
})

/*
  Esta funcion recibe el username de la que se quiere borrar
  se remplaza el :username
 */
router.delete('/:username', async (req, res) => {
  const { username } = req.params
  try {
    // Se borran de lo normal
    const user = (await cUsers.doc(username).get()).data()
    if (user) {
      const { categories } = user
      await cUsers.doc(username).delete()
      await cKeys.doc(username).delete()
      await cPetitions.doc(username).delete()

      // Se borra de recursos y categorias
      deleteCategories(categories, username)

      const resources = await cResources.get()
      resources.forEach(async (resource) => {
        const { users } = resource.data()
        const index = users.indexOf(username)
        if (index > -1) {
          users.splice(index, 1)
          await cResources.doc(resource.id).update({ users })
        }
      })
      res.status(200)
    } else {
      res.status(404)
    }
  } catch (error) {
    res.status(500)
  } finally {
    res.end()
  }
})

module.exports = router
