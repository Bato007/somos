const Joi = require('joi')
const tokenGenerator = require('uuid-v4')

const { cResources, cUsers, bucket } = require('../DataBase/firebase')

const getResourceById = async (req, res) => {
  const { id } = req.params

  try {
    const resources = await cResources.doc(id).get()

    const resource = resources.data()
    // Ahora se regresa el recurso
    res.status(200).json(resource)
  } catch (error) {
    res.status(400).json({ message: 'No se encontro' })
  }
}

const getResourceByUser = async (req, res) => {
  const { username } = req.params

  try {
    const accepted = []
    // Se obtienen los recursos
    const userSnapshot = await cUsers.doc(username).get()
    const { categories } = userSnapshot.data()
    const resourcesSnapshot = await cResources.get()

    // Se verifica si son somos o no
    if (!categories.includes('somos')) {
      resourcesSnapshot.forEach((resource) => {
        // Obtenemos la data por usuario
        let added = false
        const data = resource.data()
        data.users.forEach((user) => {
          if (user === username) { // Verificando si esta el usuario
            added = true
            const { id, title, type } = data
            accepted.push({
              id,
              title,
              resource: type,
            })
          }
        })

        // Obtenemos la data por categoria
        if (!added) {
          data.categories.forEach((category) => {
            if (categories.includes(category) && !added) { // Verificando si esta el usuario
              const { id, title, type } = data
              accepted.push({
                id,
                title,
                resource: type,
              })
              added = true
            }
          })
        }
      })
    } else {
      resourcesSnapshot.forEach((resource) => {
        const { id, title, type } = resource.data()
        accepted.push({
          id,
          title,
          resource: type,
        })
      })
    }

    // Ahora se regresan los recursos
    res.status(200).json(accepted)
  } catch (error) {
    res.status(400).json({ message: 'No se encontro' })
  }
}

const uploadResourceInfo = async (req, res) => {
  const schema = Joi.object({
    filename: Joi.string().required(),
    title: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    tags: Joi.array().min(1),
    category: Joi.array().required(),
    users: Joi.array().required(),
    date: Joi.date().required(),
  })

  // Validar informacino
  const result = schema.validate(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    res.status(400).json({ message })
  }

  if ((req.body.category.length + req.body.users.length) < 1) {
    res.status(400).json({ message: 'no se dirige a un usuario' })
  }

  // Luego de validar todos los datos se pasa al try
  try {
    const {
      title, description, tags, category, users, date, filename,
    } = req.body

    // Guardando la imagen en firebase
    const filenaPath = `./upload/${filename}`
    const token = tokenGenerator()
    await bucket.upload(filenaPath,
      {
        metadata: { metadata: { firebaseStorageDownloadTokens: token } },
        public: true,
      })
    const uploaded = bucket.file(filename)
    const url = await uploaded.getSignedUrl({
      action: 'read',
      expires: date,
    })
    const type = filename.split('.')[1]

    // Ahora se ingresa a la base de datos
    cResources.doc(token).set({
      id: token,
      title,
      description,
      users,
      categories: category,
      tags,
      available: date,
      type,
      filename,
      url,
    })

    res.status(200).json({ message: 'DONE' })
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

const updateResource = async (req, res) => {
  const schema = Joi.object({
    id: Joi.string().min(1).required(),
    title: Joi.string().min(1).max(50).required(),
    description: Joi.string().min(1).max(255).required(),
    tags: Joi.array().min(1),
    category: Joi.array().required(),
    users: Joi.array().required(),
    date: Joi.date().required(),
  })

  // Validar informacino
  const result = schema.validate(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    res.status(400).json({ message })
  }

  if ((req.body.category.length + req.body.users.length) < 1) {
    res.status(400).json({ message: 'no se dirige a un usuario' })
  }

  // Luego de validar todos los datos se pasa al try
  try {
    const {
      id, title, description, tags, category, users, date,
    } = req.body

    // Obteniendo el nombre del archivo
    const resources = await cResources.doc(id).get()
    const { name } = resources.data()

    // Guardando la imagen en firebase
    const uploaded = bucket.file(name)
    const url = await uploaded.getSignedUrl({
      action: 'read',
      expires: date,
    })

    // Ahora se ingresa a la base de datos
    await cResources.doc(id).set({
      title,
      description,
      tags,
      categories: category,
      users,
      available: date,
      url,
    })
  } catch (error) {
    res.json({ message: 'Unexpected' })
  }
}

const deleteResource = async (req, res) => {
  const { id } = req.params

  try {
    const resources = await cResources.doc(id).get()
    const resource = resources.data()

    // Se borra del bucket
    const file = bucket.file(resource.filename)
    await file.delete()

    // Se borra de la base de datos
    await cResources.doc(id).delete()

    // Ahora se regresa el recurso
    res.status(200)
  } catch (error) {
    res.status(400).json({ message: 'Error al borrar' })
  }
}

module.exports = {
  getResourceById,
  getResourceByUser,
  uploadResourceInfo,
  updateResource,
  deleteResource,
}
