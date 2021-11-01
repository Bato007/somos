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

const addCategories = (categories) => {
  const returCategories = []
  try {
    categories.forEach((temp) => {
      const category = temp.toLowerCase().replace(/^(\w)|\s(\w)/g, (grp) => grp.toUpperCase())
      cCategories.doc(category).set({ category }, { merge: true })
      returCategories.push(category)
    })
    return true
  } catch (error) {
    return []
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
  fixCapitalization,
  getArrayDiff,
}
