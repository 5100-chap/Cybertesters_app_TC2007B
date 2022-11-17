// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBaFiRzQnulTdfREqO0WI-2AcdBLw3PpqA",
    authDomain: "prepanet-back-cybertesters.firebaseapp.com",
    projectId: "prepanet-back-cybertesters",
    storageBucket: "prepanet-back-cybertesters.appspot.com",
    messagingSenderId: "983693589572",
    appId: "1:983693589572:web:07f65a52a551fe063a5011"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;

