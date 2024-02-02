import firebase from "firebase/app";
import "firebase/firestore";

let firebaseApp = {};

if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyDWALFZGP9D_NnvqA6vo49ciD3F6Fp0r5g",
        authDomain: "gdsc23-cert.firebaseapp.com",
        projectId: "gdsc23-cert",
        storageBucket: "gdsc23-cert.appspot.com",
        messagingSenderId: "975277348569",
        appId: "1:975277348569:web:9b4e42a8a96de3ade510c8",
        measurementId: "G-QD3L40GXFF",
    });
}

const db = firebase.firestore();

export default db;
