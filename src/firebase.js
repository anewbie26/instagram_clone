// const firebaseConfig = {
//   apiKey: "AIzaSyA4Hg6hTRwLWHARWPIOlzgwefgSwg5lKMM",
//   authDomain: "instagram-clone-518bd.firebaseapp.com",
//   projectId: "instagram-clone-518bd",
//   storageBucket: "instagram-clone-518bd.appspot.com",
//   messagingSenderId: "915123112236",
//   appId: "1:915123112236:web:493ab4a6503766334f8489",
// };

// export default firebaseConfig;

// import firebase from 'firebase'

// const firebaseApp = firebase.initialzeApp({
//     apiKey: "AIzaSyA4Hg6hTRwLWHARWPIOlzgwefgSwg5lKMM",
//     authDomain: "instagram-clone-518bd.firebaseapp.com",
//     projectId: "instagram-clone-518bd",
//     storageBucket: "instagram-clone-518bd.appspot.com",
//     messagingSenderId: "915123112236",
//     appId: "1:915123112236:web:493ab4a6503766334f8489",
  
// });

// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const storage = firebase.storage();

// export {db, auth, storage};

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA4Hg6hTRwLWHARWPIOlzgwefgSwg5lKMM",
  authDomain: "instagram-clone-518bd.firebaseapp.com",
  projectId: "instagram-clone-518bd",
  storageBucket: "instagram-clone-518bd.appspot.com",
  messagingSenderId: "915123112236",
  appId: "1:915123112236:web:493ab4a6503766334f8489",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, db, storage};