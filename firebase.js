// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyD46IrFP5RpnokO4sSQm_1yQF0ZQ8bWdUM",
    authDomain: "test-project-9eefd.firebaseapp.com",
    projectId: "test-project-9eefd",
    storageBucket: "test-project-9eefd.firebasestorage.app",
    messagingSenderId: "968720944596",
    appId: "1:968720944596:web:1e3ba6c543171ae5939a41",
    measurementId: "G-7M67XNR8NP"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
