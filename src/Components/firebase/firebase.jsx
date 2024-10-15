
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyAJIMyrOF6nSMsWpyHp3OZ11C403LmlpRU",
  authDomain: "media-dc8eb.firebaseapp.com",
  projectId: "media-dc8eb",
  storageBucket: "media-dc8eb.appspot.com",
  messagingSenderId: "589175041004",
  appId: "1:589175041004:web:b2c1acc10c797fa1776ec9"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, onAuthStateChanged };