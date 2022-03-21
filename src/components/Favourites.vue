<template>
  <div
    class="container-fluid"
    id="favTable"
    style="padding: 5.5% 2% 0% 2%"
  >
    <!-- if users are not logged in -->
    <!-- <div class="jumbotron" v-show="!loggedIn"> -->
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
      <div>
        <b-button v-b-modal.modal-login squared size="lg" variant="primary">
          <font-awesome-icon icon="fa-solid fa-user" />&nbsp;
          <b>Log In</b>
        </b-button>
        <b-modal id="modal-login" centered title="Welcome!" hide-footer="true">
          <SignInPage />
        </b-modal>
      </div>
    </div>

    <!-- if users are logged in -->
    <!-- <table v-show="loggedIn" id="table"> -->
    <table v-if="user" id="table">
      <tr>
        <th>Carpark</th>
        <th>Available Lots</th>
        <th>Details</th>
        <th>Directions</th>
        <th>Remove</th>
      </tr>

      <tr v-for="favourite in favourites" :key="favourite.id" id="tablerow">
        <td>{{ favourite.address }}</td>
        <td>12</td>
        <td><DetailButton :carparkId="favourite.car_park_no" /></td>
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
import SignInPage from "@/components/SignInPage.vue";

import firebaseApp from "../firebase.ts";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  name: "Favourites",

  components: {
    DetailButton,
    DetailSideBar,
    MapButton,
    RemoveButton,
    SignInPage,
  },

  data() {
    return {
      loggedIn: true, // set to false by default; to set to true when user is logged in
      favourites: [],
      user: false
    };
  },

  methods: {
    readData: async function () {
      const querySnapshot = await getDocs(collection(db, "Carparks"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().id}`);
        let carpark = this.details.filter((x) => {
          return x.car_park_no == doc.data().id;
        })[0];
        console.log(carpark.address);
        this.favourites.push(carpark);
      });
    },
  },

  // created() {
  //   this.readData();
  // },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });

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
}

th {
  background-color: rgb(198, 235, 252);
}

#tablerow {
  background-color: rgb(224, 243, 200);
}
</style>
