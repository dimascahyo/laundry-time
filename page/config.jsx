// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSvb6EkPrZS6UMQUhAJKlI4afQRySC2c0",
  authDomain: "laundrytime-58a53.firebaseapp.com",
  projectId: "laundrytime-58a53",
  storageBucket: "laundrytime-58a53.appspot.com",
  messagingSenderId: "98881538207",
  appId: "1:98881538207:web:7691e24eb27c35d3f97aaa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);