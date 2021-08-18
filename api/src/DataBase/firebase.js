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
const cAnnouncements = db.collection('annoucements')
const cKeys = db.collection('keys')

module.exports = {
  admin,
  cUsers,
  cResources,
  cAnnouncements,
  cKeys,
  bucket,
  FieldValue,
}
