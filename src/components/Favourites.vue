<template>
  <div class="container-fluid" id="favTable" style="border: solid; padding:2%;">

    <h2><font-awesome-icon icon="fa-solid fa-square-parking" /> Favourite Carparks</h2>
    <!-- if users are not logged in  -->
    <p v-show="!loggedIn">
      Want to quickly check for available parking lots at your favourite carparks? 
      <router-link to ="/Nav"> Sign up </router-link> for an account now!
      <!-- Sign up for an account now! -->
      </p>

    <!-- if users are logged in -->
    <table v-show="loggedIn" id="table">
      <tr>
        <th>Carpark</th>
        <th id="lots">Lots</th>
        <th>Directions</th>
        <th>Remove</th>
      </tr>


      <tr v-for="favourite in favourites" :key="favourite.id" id="tablerow">
          <td>{{favourite.address}}</td>
          <td>{{favourite.numLots}}</td>
          <td><MapButton :address="favourite.address" /></td>
          <td><RemoveButton text="Remove"/></td>

         <!-- {{display()}} -->
      </tr>
    </table> 
  </div>

</template>

<script>
import MapButton from "./results/MapButton.vue"
import RemoveButton from "./favourites/RemoveButton.vue"

import firebaseApp from '../firebase.ts';
import { getFirestore } from "firebase/firestore"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { favourites } from "./favourites/favourites";

const db = getFirestore(firebaseApp);

export default {
  name: "Favourites",
  
  components:{
    MapButton,
    RemoveButton
  },

  data(){
    return{
      loggedIn: true, // set to false by default; to set to true when user is logged in
      favourites: favourites,
    }
  }
  // methods:{
  // display: async function() {

  //   function reloadPage() {
  //     window.location.reload();
  //   }

  // async function removeFavourite(cp) {
  //   var carp = cp
  //   alert("You are about to remove " + carp)
  //   await deleteDoc(doc(db,"Carparks",carp))
  //   console.log("Document successfully deleted!", carp);
  //   reloadPage() // to update table
  // }

  // async function getDirections(findcp) {
  //   alert("Redirecting you to Google maps...")
  //   // open in new tab
  //   window.open("https://google.com/maps?q=1.3724386334422438,103.85029569742512");
  // }

  // let ind = 1

  // const querySnapshot = await getDocs(collection(db, "Carparks"));
  // querySnapshot.forEach((doc) => {
  // console.log(`${doc.id} => ${doc.data().Available_Lots}`);
  // let details = doc.data()
  // var table = document.getElementById("table")
  // var row = table.insertRow(ind)

  //     var carpark = doc.id
  //     var lots = (details.Available_Lots)

  //     var cell1 = row.insertCell(0); var cell2 = row.insertCell(1); var cell3 = row.insertCell(2);
  //     var cell4 = row.insertCell(3); var cell5 = row.insertCell(4);

  //     cell1.innerHTML = ind; cell2.innerHTML = carpark; cell3.innerHTML = lots; 
  //     var directionsButton = document.createElement("button")
  //     directionsButton.innerHTML = "Get Directions"
  //     directionsButton.onclick = function() {
  //       getDirections(carpark)
  //     }
  //     cell4.appendChild(directionsButton);

  //     var removeButton = document.createElement("button")
  //     removeButton.className = "bwt"
  //     removeButton.innerHTML = "Remove"
  //     removeButton.onclick = function() {
  //       removeFavourite(carpark)
  //     }
              
  //     cell5.appendChild(removeButton)

  //     ind+=1;
  // });
  // }
  // },
  

  
}

</script>

<style scoped>
table {
  width: 100%;
}

/* table,
th,
td {
  border: 1px solid black;
  text-align: center;
  } */

th,
td {
  padding: 5px;
}

th {
  background-color: rgb(198, 235, 252);
}

#tablerow {

background-color: rgb(224, 243, 200);
}
</style>