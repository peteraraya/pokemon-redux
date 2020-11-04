import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
        apiKey: "AIzaSyAGz4cpviLp38uxPD_16pRFLJZ9HIT0JAQ",
        authDomain: "crud-bluweb.firebaseapp.com",
        databaseURL: "https://crud-bluweb.firebaseio.com",
        projectId: "crud-bluweb",
        storageBucket: "crud-bluweb.appspot.com",
        messagingSenderId: "887332834674",
        appId: "1:887332834674:web:3cc20a85bba37f4c27a1eb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
// vamos a poder acceder a nuestras colecciones
const db = firebase.firestore();
// storage para almecenar archivos
const storage = firebase.storage();

export {auth, firebase, db, storage }