const admin = require('firebase-admin')
const serviceAccountKey = require('./serviceAccountKey.json')

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  storageBucket: 'gs://somos-1eb3a.appspot.com/',
})

const bucket = app.storage().bucket()

module.exports = { admin, bucket }
