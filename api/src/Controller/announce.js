const Joi = require('joi')
const customJoi = Joi.extend(require('joi-phone-number'))
const tokenGenerator = require('uuid-v4')
const { cAnnouncements } = require('../DataBase/firebase')

// GET ANNOUNCEMENTS
const getAll = async (req, res) => {
  try {
    const tempAnnouncements = await cAnnouncements.get()
    const announcements = []
    tempAnnouncements.forEach((announcement) => {
      const data = announcement.data()
      let { toDate, fromDate } = data
      toDate = toDate.toDate()
      fromDate = fromDate.toDate()
      announcements.push({ ...data, toDate, fromDate })
    })
    res.status(200).json(announcements)
  } catch (error) {
    res.status(500).json({ message: 'Unexpected' })
  }
}

const getAllHelp = async (req, res) => {
  try {
    const tempAnnouncements = await cAnnouncements.where('type', '==', 'help').get()
    const announcements = []
    tempAnnouncements.forEach((announcement) => {
      const data = announcement.data()
      let { toDate, fromDate } = data
      toDate = toDate.toDate()
      fromDate = fromDate.toDate()
      announcements.push({ ...data, toDate, fromDate })
    })
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

const getNonPublishedhHelp = async (req, res) => {
  try {
    const aux = cAnnouncements.where('type', '==', 'help')
    const tempAnnouncements = await aux.where('published', '==', 0).get()
    const announcements = []
    tempAnnouncements.forEach((announcement) => {
      const data = announcement.data()
      let { toDate, fromDate } = data
      toDate = toDate.toDate()
      fromDate = fromDate.toDate()
      announcements.push({ ...data, toDate, fromDate })
    })
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

const getPublishedhHelp = async (req, res) => {
  try {
    const aux = cAnnouncements.where('type', '==', 'help')
    const tempAnnouncements = await aux.where('published', '==', 1).get()
    const announcements = []
    tempAnnouncements.forEach((announcement) => {
      const data = announcement.data()
      let { toDate, fromDate } = data
      toDate = toDate.toDate()
      fromDate = fromDate.toDate()
      announcements.push({ ...data, toDate, fromDate })
    })
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

const getAllHomes = async (req, res) => {
  try {
    const tempAnnouncements = await cAnnouncements.where('type', '==', 'home').get()
    const announcements = []
    tempAnnouncements.forEach((announcement) => {
      const data = announcement.data()
      let { toDate, fromDate } = data
      toDate = toDate.toDate()
      fromDate = fromDate.toDate()
      announcements.push({ ...data, toDate, fromDate })
    })
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

const getNonPublishedhHome = async (req, res) => {
  try {
    const aux = cAnnouncements.where('type', '==', 'home')
    const tempAnnouncements = await aux.where('published', '==', 0).get()
    const announcements = []
    tempAnnouncements.forEach((announcement) => {
      const data = announcement.data()
      let { toDate, fromDate } = data
      toDate = toDate.toDate()
      fromDate = fromDate.toDate()
      announcements.push({ ...data, toDate, fromDate })
    })
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

const getPublishedhHome = async (req, res) => {
  try {
    const aux = cAnnouncements.where('type', '==', 'home')
    const tempAnnouncements = await aux.where('published', '==', 1).get()
    const announcements = []
    tempAnnouncements.forEach((announcement) => {
      const data = announcement.data()
      let { toDate, fromDate } = data
      toDate = toDate.toDate()
      fromDate = fromDate.toDate()
      announcements.push({ ...data, toDate, fromDate })
    })
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

// POST ANNOUNCEMENTS
const postHome = async (req, res) => {
  const schema = Joi.object({
    contact: Joi.string().min(1).required(),
    phone: customJoi.string()
    .phoneNumber({
      defaultCountry: 'GT',
      format: 'national',
      strict: false //Bajo visor
    })
    .required(),
    email: Joi.string() 
    .min(6) // Se espera valores minimos de 1 caracter + @ + emailProvider + terminacion.min(3)
    .email({ tlds: {allow: false} })
    .required(),
    title: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    date: Joi.date().required(),
  })

  // Validar informacion
  const result = schema.validate(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    res.status(400).json({ message })
  } else {
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
      res.status(500).json({ message: 'Unexpected' })
    }
  }
}

const postHelp = async (req, res) => {
  const schema = Joi.object({
    contact: Joi.string().min(1).required(),
    phone: customJoi.string()
    .phoneNumber({
      defaultCountry: 'GT',
      format: 'national',
      strict: false //Bajo visor
    })
    .required(),
    email: Joi.string() 
    .min(6) // Se espera valores minimos de 1 caracter + @ + emailProvider + terminacion.min(3)
    .email({ tlds: {allow: false} })
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
      fromDate: new Date(),
      type: 'help',
      published: 0,
    })
    res.status(200).json({ message: 'Added' })
  } catch (error) {
    res.status(500).json({ message: 'Unexpected' })
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
