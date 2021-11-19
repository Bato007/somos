const nodemailer = require('nodemailer')
const mail = require('../../mails/account.json')
const { cCategories, cTags } = require('../DataBase/firebase')

const fixCapitalization = (array) => {
  let fixed = []
  try {
    array.forEach((element) => {
      fixed.push(element.toLowerCase().replace(/^(\w)|\s(\w)/g, (grp) => grp.toUpperCase()))
    })
  } catch (error) {
    fixed = undefined
  }
  return fixed
}

const makeLower = (array) => {
  let fixed = []
  try {
    array.forEach((element) => {
      fixed.push(element.toLowerCase())
    })
  } catch (error) {
    fixed = undefined
  }
  return fixed
}

const getArrayDiff = (original, modified) => {
  const difference = { added: [], removed: [] }

  original.forEach((element) => {
    if (!modified.includes(element)) {
      difference.removed.push(element)
    }
    const index = modified.indexOf(element)
    if (index !== -1) { modified.splice(index, 1) }
  })
  difference.added = modified
  return difference
}

const createCategories = async (categories, username) => {
  try {
    const fCategories = await cCategories.get()

    // Agregando categorias existentes
    fCategories.forEach(async (element) => {
      // Se verifica que no este
      const { category, users } = element.data()
      if (categories.includes(category)) {
        users.push(username)
        await cCategories.doc(category).update({ users })

        // Se elimina al usuario de la lista de categories
        const index = categories.indexOf(username)
        categories.splice(index, 1)
      }
    })

    // Se agregan todas las categorias que no existen
    categories.forEach(async (category) => {
      await cCategories.doc(category).set({ category, users: [username] })
    })

    return true
  } catch (error) {
    return false
  }
}

const sendMail = (to, subject, text) => {
  let sended = false
  const transporter = nodemailer.createTransport(mail)

  const mailOptions = {
    from: mail.auth?.user,
    to,
    subject,
    text,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      sended = true
    }
  })
  return sended
}

module.exports = {
  createCategories,
  sendMail,
  fixCapitalization,
  getArrayDiff,
  makeLower,
}
