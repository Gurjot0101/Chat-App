import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUBwa4SthbaWuWXiqZvCmx4piRMa5JEIQ",
  authDomain: "whatschat-eb99a.firebaseapp.com",
  projectId: "whatschat-eb99a",
  storageBucket: "whatschat-eb99a.appspot.com",
  messagingSenderId: "40498135509",
  appId: "1:40498135509:web:c31e031d1401cb910efd5c",
  measurementId: "G-20GRV5GFTB",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
