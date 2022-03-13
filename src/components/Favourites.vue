<template>
  <div class="container-fluid" id="favTable" style="border: solid; padding: 2%">
    <h2>
      <font-awesome-icon icon="fa-solid fa-square-parking" /> Favourite Carparks
    </h2>
    <!-- if users are not logged in  -->
    <p v-show="!loggedIn">
      Want to quickly check for available parking lots at your favourite
      carparks?
      <router-link to="/SignUp"> Sign up </router-link> for an account now!
    </p>

    <!-- if users are logged in -->
    <table v-show="loggedIn" id="table">
      <tr>
        <th>Carpark</th>
        <th>Available Lots</th>
        <th>Details</th>
        <th>Directions</th>
        <th>Remove</th>
      </tr>

      <!-- <tr v-for="favourite in favourites" :key="favourite.id" id="tablerow"> -->
      <tr v-for="favourite in favourites" :key="favourite.id" id="tablerow">
        <td>{{ favourite.address }}</td>
        <td>{{ favourite.Available_Lots }}</td>
        <td><DetailButton :carparkId="favourite.id" /></td>
        <td><MapButton :address="favourite.address" /></td>
        <td><RemoveButton :id="favourite.address" text="Remove" /></td>
        <DetailSideBar size="sm" :favourite="favourite" />
      </tr>
    </table>
  </div>
</template>

<script>
import DetailButton from "./results/DetailButton.vue";
import DetailSideBar from "./favourites/DetailSideBar.vue";
import MapButton from "./results/MapButton.vue";
import RemoveButton from "./favourites/RemoveButton.vue";

import firebaseApp from "../firebase.ts";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, doc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  name: "Favourites",

  components: {
    DetailButton,
    DetailSideBar,
    MapButton,
    RemoveButton,
  },

  data() {
    return {
      loggedIn: true, // set to false by default; to set to true when user is logged in
      favourites: [],
    };
  },

  methods: {
    readData: async function () {
      const querySnapshot = await getDocs(collection(db, "Carparks"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().Available_Lots}`);
        this.favourites.push(doc.data());
      });
    },
  },

  created() {
    this.readData();
  },

  props: {
    favourite: Object,
  },
};
</script>

<style scoped>
table {
  width: 100%;
}

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
