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

// huiyee firebase (for own testing)
const firebaseConfig = {
  apiKey: "AIzaSyDoXHLGqGAohdqrelFad3gI6cmFZDLY4zs",
  authDomain: "carpark-60564.firebaseapp.com",
  projectId: "carpark-60564",
  storageBucket: "carpark-60564.appspot.com",
  messagingSenderId: "848440803621",
  appId: "1:848440803621:web:c4ec80f304d8bed4c65acc",
  measurementId: "G-M7VV4R3PKR"
};

// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

export default firebase;
