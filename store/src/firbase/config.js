// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9ADTxrrjsBShd9W03iaG9Encv1a_q1aQ",
  authDomain: "store-firbase-b446e.firebaseapp.com",
  projectId: "store-firbase-b446e",
  storageBucket: "store-firbase-b446e.appspot.com",
  messagingSenderId: "131228507896",
  appId: "1:131228507896:web:860984d992780f1dd6650d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);