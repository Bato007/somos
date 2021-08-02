const Joi = require('joi')
const tokenGenerator = require('uuid-v4')
const { cAnnouncements } = require('../DataBase/firebase')

// GET ANNOUNCEMENTS
const getAll = async (req, res) => {
  try {
    const tempAnnouncements = await cAnnouncements.get()
    const announcements = tempAnnouncements.data()
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

const getAllHelp = async (req, res) => {
  try {
    const tempAnnouncements = await cAnnouncements.where({ type: 'help' }).get()
    const announcements = tempAnnouncements.data()
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

const getNonPublishedhHelp = async (req, res) => {
  try {
    const tempAnnouncements = await cAnnouncements.where({
      type: 'help',
      published: 0,
    }).get()
    const announcements = tempAnnouncements.data()
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

const getPublishedhHelp = async (req, res) => {
  try {
    const tempAnnouncements = await cAnnouncements.where({
      type: 'help',
      published: 1,
    }).get()
    const announcements = tempAnnouncements.data()
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

const getAllHomes = async (req, res) => {
  try {
    const tempAnnouncements = await cAnnouncements.where({ type: 'home' }).get()
    const announcements = tempAnnouncements.data()
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

const getNonPublishedhHome = async (req, res) => {
  try {
    const tempAnnouncements = await cAnnouncements.where({
      type: 'home',
      published: 0,
    }).get()
    const announcements = tempAnnouncements.data()
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

const getPublishedhHome = async (req, res) => {
  try {
    const tempAnnouncements = await cAnnouncements.where({
      type: 'home',
      published: 1,
    }).get()
    const announcements = tempAnnouncements.data()
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

// POST ANNOUNCEMENTS
const postHome = async (req, res) => {
  const schema = Joi.object({
    contact: Joi.string().min(1).required(),
    phone: Joi.number().required(),
    email: Joi.string().min(1).required(),
    title: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
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
      fromDate: new Date(),
      type: 'home',
      published: 0,
    })
    res.status(200).json({ message: 'Added' })
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

const postHelp = async (req, res) => {
  const schema = Joi.object({
    contact: Joi.string().min(1).required(),
    phone: Joi.number().required(),
    email: Joi.string().min(1).required(),
    title: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
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
      fromDate: new Date(),
      type: 'help',
      published: 0,
    })
    res.status(200).json({ message: 'Added' })
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

module.exports = {
  getAll,
  getAllHelp,
  getNonPublishedhHelp,
  getPublishedhHelp,
  getAllHomes,
  getNonPublishedhHome,
  getPublishedhHome,
  postHome,
  postHelp,
}
