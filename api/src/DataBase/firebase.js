const admin = require('firebase-admin')
const serviceAccountKey = require('./serviceAccountKey.json')

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  storageBucket: 'gs://somos-1eb3a.appspot.com/',
})

const bucket = app.storage().bucket()
const db = admin.firestore()
const { FieldValue } = admin.firestore
db.settings({ ignoreUndefinedProperties: true })

// Obteniendo las colecciones
const cUsers = db.collection('users')
const cResources = db.collection('resources')

module.exports = {
  admin,
  cUsers,
  cResources,
  bucket,
  FieldValue,
}
