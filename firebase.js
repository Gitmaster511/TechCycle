// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS_WyLglUHaJzoCdcD5ndYN3bDKFjuzvg",
  authDomain: "techcycle-eefe8.firebaseapp.com",
  projectId: "techcycle-eefe8",
  storageBucket: "techcycle-eefe8.appspot.com",
  messagingSenderId: "841371061773",
  appId: "1:841371061773:web:0fc161db3fb12d974dcf44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
export { app, db, doc, getDoc };
