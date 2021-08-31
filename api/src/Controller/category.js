const Joi = require('joi')
const { cCategories } = require('../DataBase/firebase')

const getCategories = async (req, res) => {
  try {
    const categories = await cCategories.get()
    const aux = []
    categories.forEach((category) => {
      aux.push(category.data())
    })
    res.status(200).json(aux)
  } catch (error) {
    res.sendStatus(500)
  }
}

const getCategoriesNames = async (req, res) => {
  try {
    const categories = await cCategories.get()
    const aux = []
    categories.forEach((category) => {
      aux.push(category.id)
    })
    res.status(200).json(aux)
  } catch (error) {
    res.sendStatus(500)
  }
}

const createCategories = async (req, res) => {
  const schema = Joi.object({
    categories: Joi.array().min(1).required(),
  })

  // Validar informacino
  const result = schema.validate(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    res.status(400).json({ message })
  } else {
    try {
      const { categories } = req.body
      // Para cada categoria se agrega el usuario
      const users = []
      categories.forEach(async (category) => {
        // Se verifica que no esta en firebase
        const tempCategory = await cCategories.doc(category).get()
        if (!tempCategory.exists) {
          cCategories.doc(category).set({
            category,
            users,
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
  getCategories,
  getCategoriesNames,
  createCategories,
}
