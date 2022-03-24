<template>
  <div class="container-fluid" id="favTable" style="padding: 5.5% 2% 0% 2%">
    <!-- if users are not logged in -->
    <div class="jumbotron" v-if="!user">
      <h1 class="display-4">
        <strong>Welcome to Carparks</strong>
      </h1>
      <p class="lead">
        <strong>
          Log in to quickly check for available parking lots at your favourite
          carparks.
        </strong>
      </p>
    </div>

    <!-- if users are logged in -->
    <h2 v-if="user">
      <font-awesome-icon icon="fa-solid fa-square-parking" /> Favourite Carparks
    </h2>
    <table v-if="user" id="table">
      <tr>
        <th width="20%" id="carparkheader">Carpark</th>
        <th width="10%">Rename</th>
        <th width="10%">Available Lots</th>
        <th>Details</th>
        <th>Directions</th>
        <th>Edit</th>
      </tr>

      <tr v-for="favourite in favourites" :key="favourite.id" id="tablerow">
        <!-- <td>{{ favourite.address }}</td> -->
        <td>{{ favourite.name }}</td>
        <td>
          <b-button
            squared
            size="sm"
            v-on:click="renameCarpark(favourite)"
            variant="dark"
          >
            <font-awesome-icon icon="fa-solid fa-pencil" />&nbsp;
            <!-- <b>Rename</b> -->
          </b-button>
        </td>
        <td>12</td>
        <td><DetailButton :carparkId="favourite.car_park_no" /></td>
        <td><MapButton :address="favourite.address" /></td>
        <td><RemoveButton :id="favourite.car_park_no" text="Remove" /></td>

        <!-- <td>
          <div>
            <b-dropdown id="dropdown-1" text="Edit" class="m-md-2">
              <b-dropdown-item v-on:click="renameCarpark(favourite)"><font-awesome-icon icon="fa-solid fa-pencil" /> &nbsp; Rename</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item v-on:click="removeCarpark(favourite)"><font-awesome-icon icon="fa-solid fa-trash-can" /> &nbsp; Remove</b-dropdown-item>
              
            </b-dropdown>
          </div>
        <td/> -->

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
// import SignInPage from "@/components/SignInPage.vue";

import firebaseApp from "../firebase.ts";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
      favourites: [],
      user: false,
    };
  },

  methods: {
    removeCarpark: async function (favourite) {
      function reloadPage() {
        window.location.reload();
      }

      alert(
        "This carpark will be removed from your list of Favourite Carparks"
      );
      console.log("deleting carpark " + favourite.id);
      await deleteDoc(doc(db, "Carparks", favourite.id));
      console.log("Document successfully deleted!", favourite.id);
      reloadPage();
    },

    readData: async function () {
      const querySnapshot = await getDocs(collection(db, "Carparks"));
      // const querySnapshot = await getDocs(collection(db, String(currentUser)));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().id}`);
        let carpark = this.details.filter((x) => {
          return x.car_park_no == doc.data().id;
        })[0];
        console.log(carpark.address);

        updateDoc(doc.ref, {
          // name: doc.data().name,
          // ensure that name attribute of carparks stored in firebase
          // are initially set to be their respective address
          // name: carpark.address, cannot do it here as it will overwrite new name set by user
          address: carpark.address,
          car_park_no: carpark.car_park_no,
          car_park_type: carpark.car_park_type,
          type_of_parking_system: carpark.type_of_parking_system,
          free_parking: carpark.free_parking,
          short_term_parking: carpark.short_term_parking,
          night_parking: carpark.night_parking,
        });

        // this.favourites.push(carpark);
        this.favourites.push(doc.data());
      });
    },

    renameCarpark: async function (favourite) {
      // console.log("renaming carpark " + favourite.car_park_no);
      const carpark = favourite.id;
      console.log("final renaming " + carpark);

      const carparkRef = doc(db, "Carparks", favourite.id);
      await updateDoc(carparkRef, {
        // name: "ah girl tuition centre"
        name: "Office",
      });
      window.location.reload();
    },
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });

    // const currentUser = auth.currentUser.email;

    this.readData();
  },

  props: {
    favourite: Object,
    details: Array,
  },
};
</script>

<style scoped>
.jumbotron {
  padding-top: 10%;
  padding-bottom: 15%;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.3) 100%
    ),
    url(../assets/carpark_11.jpg);
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  -o-background-size: cover;
  color: white;
  text-shadow: 1px 1px 4px #000000;
  overflow-y: visible !important;
}

img {
  width: 100%;
}

table {
  width: 100%;
}

th,
td {
  padding: 5px;
  text-align: center;
}

th {
  background-color: rgb(198, 235, 252);
}

#tablerow {
  background-color: rgb(224, 243, 200);
}
</style>
