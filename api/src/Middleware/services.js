const { cCategories, cTags } = require('../DataBase/firebase')

const addCategories = (categories) => {
  try {
    categories.forEach((temp) => {
      const category = temp.toLowerCase().replace(/^(\w)|\s(\w)/g, (grp) => grp.toUpperCase())
      cCategories.doc(category).set({ category }, { merge: true })
    })
    return true
  } catch (error) {
    return false
  }
}

const addTags = (tags) => {
  try {
    tags.forEach((temp) => {
      const tag = temp.toLowerCase().replace(/^(\w)|\s(\w)/g, (grp) => grp.toUpperCase())
      cTags.doc(tag).set({ tag }, { merge: true })
    })
    return true
  } catch (error) {
    return false
  }
}

const sendMail = () => {
  console.log('email sent')
}

module.exports = {
  addCategories,
  addTags,
  sendMail,
}
