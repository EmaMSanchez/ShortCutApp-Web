
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyCCqxBCitdlUps9jnW7j0beffgljzFFqaE",
  authDomain: "database-fbse.firebaseapp.com",
  projectId: "database-fbse",
  storageBucket: "database-fbse.appspot.com",
  messagingSenderId: "394141073446",
  appId: "1:394141073446:web:d62ea11d0e30eb6ca2a6e7"
};


const app = initializeApp(firebaseConfig); //Se envia a firebase las credenciales y devuelve la conexxion
const auth = getAuth(app); //Envia app y trae datos de autenicacion
const db = getFirestore(app); //Envia app (coneccion y credenciales), recive coneccion y datos de firestore (Base de Datos) 

export { auth, db };