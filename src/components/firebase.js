import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB5zBtgtFMS_GbBixg3FpI1spFVes7AZUo",
  authDomain: "arquisanter.firebaseapp.com",
  projectId: "arquisanter",
  storageBucket: "arquisanter.appspot.com",
  messagingSenderId: "708230546598",
  appId: "1:708230546598:web:f9a5333990c25558bda067"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { firebase, storage };
