const Joi = require('joi')
const tokenGenerator = require('uuid-v4')
const pool = require('../DataBase/database')

// GET ANNOUNCEMENTS
const getAll = async (req, res) => {
  try {
    const tempAnnouncements = await pool.query(`
      SELECT *
      FROM announcement;
    `)
    const announcements = tempAnnouncements.rows
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

const getAllHelp = async (req, res) => {
  try {
    const tempAnnouncements = await pool.query(`
      SELECT *
      FROM announcement
      WHERE type = 'help';
    `)
    const announcements = tempAnnouncements.rows
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

const getNonPublishedhHelp = async (req, res) => {
  try {
    const tempAnnouncements = await pool.query(`
      SELECT *
      FROM announcement
      WHERE type = 'help'
      AND published = false;
    `)
    const announcements = tempAnnouncements.rows
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

const getPublishedhHelp = async (req, res) => {
  try {
    const tempAnnouncements = await pool.query(`
      SELECT *
      FROM announcement
      WHERE type = 'help'
      AND published = true;
    `)
    const announcements = tempAnnouncements.rows
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

const getAllHomes = async (req, res) => {
  try {
    const tempAnnouncements = await pool.query(`
      SELECT *
      FROM announcement
      WHERE type = 'homes';
    `)
    const announcements = tempAnnouncements.rows
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

const getNonPublishedhHome = async (req, res) => {
  try {
    const tempAnnouncements = await pool.query(`
      SELECT *
      FROM announcement
      WHERE type = 'home'
      AND published = false;
    `)
    const announcements = tempAnnouncements.rows
    res.status(200).json(announcements)
  } catch (error) {
    res.status(400).json({ message: 'Unexpected' })
  }
}

const getPublishedhHome = async (req, res) => {
  try {
    const tempAnnouncements = await pool.query(`
      SELECT *
      FROM announcement
      WHERE type = 'home'
      AND published = true;
    `)
    const announcements = tempAnnouncements.rows
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
    await pool.query(`
      INSERT INTO announcement VALUES
        ($1, $2, $3, $4, $5, $6, $7, false, 'home');
    `, [id, contact, phone, email, title, description, date])

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
}
