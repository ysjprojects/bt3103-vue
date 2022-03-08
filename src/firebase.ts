// Import the functions you need from the SDKs you need
import firebase from 'firebase'
import 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsO8k1__-CjFUGuzz8lQlLCL8NACb1Gq0",
  authDomain: "carpark-34d6a.firebaseapp.com",
  projectId: "carpark-34d6a",
  storageBucket: "carpark-34d6a.appspot.com",
  messagingSenderId: "412956589313",
  appId: "1:412956589313:web:bb6280c7d3705592132f00",
  measurementId: "G-3TXT3CNLWR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebaseApp.firestore();
export default db