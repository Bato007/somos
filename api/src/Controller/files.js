const fs = require('fs')

const erase = (path) => {
  try {
    fs.unlinkSync(path)
    // file removed
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  erase,
}
