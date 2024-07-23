import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAQWgCToLFfkE5oYnyiceUVBXmwA6SgGu8",
  authDomain: "lossantderr.firebaseapp.com",
  projectId: "lossantderr",
  storageBucket: "lossantderr.appspot.com",
  messagingSenderId: "737661621261",
  appId: "1:737661621261:web:a4e84ab813e4ec00faf144"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { firebase, storage };
