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

const getArrayDiff = (origin, mod) => {
  const difference = { added: [], removed: [] }
  const original = [...origin]
  const modified = [...mod]

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
    categories.forEach(async (category) => {
      const fCategory = await cCategories.doc(category).get()
      if (fCategory.exists) {
        const { users } = fCategory.data()
        users.push(username)
        await cCategories.doc(category).update({ users })
      } else {
        await cCategories.doc(category).set({ category, users: [username] })
      }
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
  let index = -1
  if (array) {
    array.forEach((element, i) => {
      if (element.id === id) {
        index = i
      }
    })
  }
  return index
}

const createTags = async (tags, information) => {
  try {
    tags.forEach(async (tag) => {
      const fTag = await cTags.doc(tag).get()
      if (fTag.exists) {
        const { resources } = fTag.data()
        resources.push(information)
        await cTags.doc(tag).update({ resources })
      } else {
        await cTags.doc(tag).set({ tag, resources: [information] })
      }
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
      if (tags.includes(tag) && result > -1) {
        resources.splice(result[1])
        if (resources.length === 0) {
          await cTags.doc(tag).delete()
        } else {
          await cTags.doc(tag).update({ resources })
        }
      }
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
