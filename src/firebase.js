import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBXEuTZJTyRZPFYrUfFLu-h19KIizdsr8c",
    authDomain: "netflix-clone-c2816.firebaseapp.com",
    projectId: "netflix-clone-c2816",
    storageBucket: "netflix-clone-c2816.appspot.com",
    messagingSenderId: "617310970710",
    appId: "1:617310970710:web:a2741f0ec210f674936cf7"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth()



export {auth}
export default db