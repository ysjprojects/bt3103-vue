// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBQfwzN4QNVtFmf-jlLpFtW_rFLhxoC4IU",
//   authDomain: "bt3103-d48ba.firebaseapp.com",
//   projectId: "bt3103-d48ba",
//   storageBucket: "bt3103-d48ba.appspot.com",
//   messagingSenderId: "715925829160",
//   appId: "1:715925829160:web:777cea7ca0cc35a578271d",
// };

// using bt3103 firebase 
const firebaseConfig = {
  apiKey: "AIzaSyBQfwzN4QNVtFmf-jlLpFtW_rFLhxoC4IU",
  authDomain: "bt3103-d48ba.firebaseapp.com",
  projectId: "bt3103-d48ba",
  storageBucket: "bt3103-d48ba.appspot.com",
  messagingSenderId: "715925829160",
  appId: "1:715925829160:web:777cea7ca0cc35a578271d"
};

// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

export default firebase;