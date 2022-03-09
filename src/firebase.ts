import { initializeApp } from "firebase/app";

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
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
