// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCwzKHihqkw6WoQ2xFvuqttKzzkKcUCX-0',
    authDomain: 'reactfirebaseauth-2ba7d.firebaseapp.com',
    databaseURL: 'https://reactfirebaseauth-2ba7d-default-rtdb.firebaseio.com',
    projectId: 'reactfirebaseauth-2ba7d',
    storageBucket: 'reactfirebaseauth-2ba7d.appspot.com',
    messagingSenderId: '195980145989',
    appId: '1:195980145989:web:2df7634f98c44734837a2c'
};

// Initialize Firebase
export const Firebase = firebase.initializeApp(firebaseConfig);
export const db = Firebase.database();

//  default firebase;
