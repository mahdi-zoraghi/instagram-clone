import firebase from "firebase/app"

import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAJw_Qk02WccVfO7iCeehzeh79CHRWzFfU",
  authDomain: "instagram-clone-cfe41.firebaseapp.com",
  projectId: "instagram-clone-cfe41",
  storageBucket: "instagram-clone-cfe41.appspot.com",
  messagingSenderId: "933156413672",
  appId: "1:933156413672:web:5af51cb42af49a8b0e695d",
  measurementId: "G-WLXDXZE14S",
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }
