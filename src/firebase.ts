// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
// export const db = getFirestore(firebaseApp);

// export default firebaseApp;

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;

const db = getFirestore(firebaseApp);

// export const querySnapshot = getDocs(collection(db, "Carparks"));