// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDoXHLGqGAohdqrelFad3gI6cmFZDLY4zs",
//   authDomain: "carpark-60564.firebaseapp.com",
//   projectId: "carpark-60564",
//   storageBucket: "carpark-60564.appspot.com",
//   messagingSenderId: "848440803621",
//   appId: "1:848440803621:web:c4ec80f304d8bed4c65acc",
//   measurementId: "G-M7VV4R3PKR"
// };

// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// export const db = getFirestore(firebaseApp);

// import { getFirestore } from "firebase/firestore"
// import { collection, getDocs} from "firebase/firestore";

// const datab = getFirestore(firebaseApp);

// export const favourites = getDocs(collection(db, "Carparks"));
    //   favourites.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data().Available_Lots}`);
    //   let details = doc.data()

export const favourites = [{
    id: "A2",
    address: "BLK 501 YISHUN ST 51",
    region: "North",
    numLots: 18,
    distance: 1.2
},
{
    id: "A8",
    address: "BLK 728A WOODLANDS CIRCLE",
    region: "North",
    numLots: 38,
    distance: 5
},
{
    id: "A12",
    address: "BLK 201E TAMPINES STREET 21",
    region: "East",
    numLots: 2,
    distance: 16
}
]