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

const deleteCategories = async (categories, username) => {
  try {
    const fCategories = await cCategories.get()
    fCategories.forEach(async (element) => {
      const { category, users } = element.data()
      const index = users.indexOf(username)
      if (categories.includes(category) && index > -1) {
        users.splice(index, 1)
        if (users.length === 0) {
          await cCategories.doc(category).delete()
        } else {
          await cCategories.doc(category).update({ users })
        }
      }
    })

    return true
  } catch (error) {
    return false
  }
}

const objectIncludes = (array, id) => {
  let flag = false
  let index = 0
  array.forEach((element, i) => {
    if (element.id === id) {
      flag = true
      index = i
    }
  })
  return [flag, index]
}

const createTags = async (tags, information) => {
  try {
    const fTags = await cTags.get()
    const { id } = information

    // Agregando categorias existentes
    fTags.forEach(async (element) => {
      // Se verifica que no este
      const { resources, tag } = element.data()
      const result = objectIncludes(resources, id)
      if (result[0]) {
        resources.push(information)
        await cCategories.doc(tag).update({ resources })

        // Se elimina al usuario de la lista de categories
        tags.splice(result[1], 1)
      }
    })

    // Se agregan todas las categorias que no existen
    tags.forEach(async (tag) => {
      await cCategories.doc(tag).set({ tag, users: [information] })
    })

    return true
  } catch (error) {
    return false
  }
}

const deleteTags = async (tags, information) => {
  try {
    const fTags = await cTags.get()
    const { id } = information

    fTags.forEach(async (element) => {
      const { resources, tag } = element.data()
      const result = objectIncludes(resources, id)
      if (result[0] && result[1] > -1) {
        resources.splice(result[1])
        if (resources.length === resources) {
          await cTags.doc(tag).delete()
        } else {
          await cCategories.doc(tag).update({ resources })
        }
      }
    })

    // Se agregan todas las categorias que no existen
    tags.forEach(async (tag) => {
      await cCategories.doc(tag).set({ tag, users: [information] })
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
  deleteCategories,
  createTags,
  deleteTags,
  sendMail,
  fixCapitalization,
  getArrayDiff,
  makeLower,
}
