const Joi = require('joi')
const { cTags } = require('../DataBase/firebase')

const getTags = async (req, res) => {
  try {
    const tags = await cTags.get()
    const aux = []
    tags.forEach((tag) => {
      aux.push(tag.data())
    })
    res.status(200).json(aux)
  } catch (error) {
    res.sendStatus(500)
  }
}

const getTagsName = async (req, res) => {
  try {
    const tags = await cTags.get()
    const aux = []
    tags.forEach((tag) => {
      aux.push(tag.id)
    })
    res.status(200).json(aux)
  } catch (error) {
    res.sendStatus(500)
  }
}

const createTags = async (req, res) => {
  const schema = Joi.object({
    tags: Joi.array().min(1).required(),
  })

  // Validar informacino
  const result = schema.validate(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    res.status(400).json({ message })
  } else {
    try {
      const { tags } = req.body
      // Para cada categoria se agrega el usuario
      const resources = []
      tags.forEach(async (tag) => {
        // Se verifica que no esta en firebase
        const tempCategory = await cTags.doc(tag).get()
        if (!tempCategory.exists) {
          cTags.doc(tag).set({
            tag,
            resources,
          })
        }
      })
      res.sendStatus(200)
    } catch (error) {
      res.sendStatus(500)
    }
  }
}

module.exports = {
  getTags,
  getTagsName,
  createTags,
}
