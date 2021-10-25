import firebase from 'firebase/app'
import 'firebase/storage'
import config from './firebase.json'

firebase.initializeApp(config)
const storage = firebase.storage()

export default storage
