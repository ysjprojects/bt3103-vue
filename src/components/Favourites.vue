<template>
  <div class="container-fluid" id="favTable" style="border: solid; padding: 2%">
    <h2>
      <font-awesome-icon icon="fa-solid fa-square-parking" /> Favourite Carparks
    </h2>
    <!-- if users are not logged in  -->
    <p v-show="!loggedIn">
      Want to quickly check for available parking lots at your favourite
      carparks?
      <router-link to="/Nav"> Sign up </router-link>
      for an account now!
    </p>

    <!-- if users are logged in -->
    <table v-show="loggedIn" id="table">
      <!-- <table> -->
      <tr>
        <th>S.No</th>
        <th>Carpark</th>
        <th id="lots">Lots</th>
        <th>Directions</th>
        <th>Remove</th>
      </tr>

      <tr style="background-color: lightgreen">
        <td>1</td>
        <td>ANG MO KIO AVENUE 9</td>
        <td>20</td>
        <td>
          <b-button
            id="directionbutton"
            type="button"
            v-on:click="getDirections()"
            variant="primary"
          >
            <font-awesome-icon icon="fa-solid fa-route" />
            Get Directions</b-button
          >
        </td>
        <td>
          <b-button
            id="removebutton"
            type="button"
            v-on:click="removeFavourite()"
          >
            <font-awesome-icon icon="fa-solid fa-trash-can" />
            Remove</b-button
          >
        </td>
      </tr>

      <tr style="background-color: lightpink">
        <td>2</td>
        <td>BLK 628 SENJA RD</td>
        <td>2</td>
        <td>
          <b-button
            id="directionbutton"
            type="button"
            v-on:click="getDirections()"
            variant="primary"
          >
            <font-awesome-icon icon="fa-solid fa-route" />
            Get Directions</b-button
          >
        </td>

        <td>
          <b-button
            id="removebutton"
            type="button"
            v-on:click="removeFavourite()"
          >
            <font-awesome-icon icon="fa-solid fa-trash-can" />
            Remove</b-button
          >
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { db } from "../firebase.ts";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default {
  name: "Favourites",

  methods: {
    getDirections() {
      alert("Redirecting you to Google Maps...");
      // let coords = geoController.getPosition().coords;

      // open in new tab
      window.open(
        "https://google.com/maps?q=1.3724386334422438,103.85029569742512"
      );

      // open in same tab
      // window.location.href = "https://google.com/maps?q=1.3724386334422438,103.8502956974251";
      // window.open("https://google.com/maps?q=1.3724386334422438,103.8502956974251", "_self");
    },

    removeFavourite() {
      alert("You are about to remove this carpark from your favourite list");
    },
  },

  data() {
    return {
      loggedIn: true, // set to false by default; to set to true when user is logged in
    };
  },

  // mounted() {
  //   // async function display(){
  //   function display(){
  // //     // let z = await getDocs(collection(db,"Carparks"))
  // //     // let z = await db.collection("Portfolio").get()
  //     let ind = 1

  //     var cell1 = row.insertCell(0); var cell2 = row.insertCell(1); var cell3 = row.insertCell(2);
  //     var cell4 = row.insertCell(3); var cell5 = row.insertCell(4);

  // //     cell1.innerHTML = ind; cell2.innerHTML = carpark; cell3.innerHTML = lots;

  //     cell1.innerHTML = ind; cell2.innerHTML = "BLK 628 SENJA RD"; cell3.innerHTML = 28;

  //     var directionButtion = document.createElement("button");
  //      directionButtion.innerHTML = "Get Directions";
  //      directionButtion.onclick = function() {
  //    getDirections(carpark)
  // }
  // cell4.appendChild(directionButtion);

  //     var removeButton = document.createElement("button");
  //     // removeButton.className = "bwt";
  //     // removeButton.id = String(carpark);
  //     removeButton.innerHTML = "Remove";
  //     // removeButton.onclick = function() {
  //     //   removeFavourite(carpark)
  //     // }
  //     cell5.appendChild(removeButton);

  //     ind+=1;
  //   }
  //   display()

  //   async function removeFavourite(carpark) {
  //     var x = carpark;
  //     alert("You are going to remove " + x + "from your favourites!")
  //     // await deleteDoc(doc(db,"Carparks",x))
  //     console.log("Carpark successfully removed!", x);
  //     let tb = document.getElementById("table")
  //     // when delete button is pressed the following code will
  //     // delete all the rows of data except for heading row
  //     // then call display() again to display the updated data

  //     while (tb.rows.length > 1){
  //       tb.deleteRow(1)
  //     }
  //     display()
  //   }
  // }
};
// display()
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
</style>
