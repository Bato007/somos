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
const cAnnouncements = db.collection('announcements')
const cKeys = db.collection('keys')
const cCategories = db.collection('categories')
const cTags = db.collection('tags')
const cPetitions = db.collection('petitions')
const cReset = db.collection('forgetpassword')

module.exports = {
  admin,
  cUsers,
  cResources,
  cAnnouncements,
  cKeys,
  bucket,
  cCategories,
  cTags,
  cPetitions,
  cReset,
  FieldValue,
}
