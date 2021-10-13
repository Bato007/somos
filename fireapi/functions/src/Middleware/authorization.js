const { cKeys } = require('../DataBase/firebase')

// Se verifica que tenga permiso de continuar
const authorizate = async (req, res, next) => {
  try {
    const { somoskey } = req.headers
    const url = req.originalUrl
    let continuar = true

    // Se verifica si es signin
    if (!somoskey) {
      res.status(400).json({ message: 'ERROR 900' })
    }

    const keys = await cKeys.where('somoskey', '==', somoskey).get()
    let tempKey

    // Ahora se verifica que exista la llave
    if (keys.empty) {
      res.status(400).json({ message: 'ERROR 901' })
    } else {
      keys.forEach((key) => {
        tempKey = key.data()
      })

      const { expires, isSomos } = tempKey
      // Ahora se verifica si la llave expiro
      if (expires.toDate() < new Date()) {
        continuar = false
        res.status(401).json({ message: 'ERROR 902' })
      }

      // Ahora se verifica si la ruta esta permitida
      if ((url.indexOf('admin') > -1) && (!isSomos)) {
        continuar = false
        res.status(403).json({ message: 'ERROR 903' })
      }

      if (continuar) next()
    }
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  authorizate,
}
