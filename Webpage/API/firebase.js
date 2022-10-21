// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getFirestore,
        collection, 
        addDoc, 
        getDocs } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";

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

const db = getFirestore()

//Funcion para guardar alumnos
export const guardarAlumno = (nombre, correoInstitucional, matricula, password, campus) => {
    addDoc(collection(db, 'alumno'), {campus, correoInstitucional, matricula, password })
};
//Listar todos los alumnos
export const listarTodoAlumno = () => {
    getDocs(collection(db, 'alumno'))
};
