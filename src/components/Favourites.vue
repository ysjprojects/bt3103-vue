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
        <th>Remove</th>
      </tr>

      <tr v-for="favourite in favourites" :key="favourite.id" id="tablerow">
        <td>{{ favourite.name }}</td>

        <td>
          <div>
            <b-button
              v-b-modal.modal-prevent-closing
              squared
              size="sm"
              variant="dark"
              @click="show=true"
              v-on:click="setCarparkToRename(favourite)"
              >
              <font-awesome-icon icon="fa-solid fa-pencil" />
            </b-button>
          </div>
        </td>

        <td>12</td>
        <td><DetailButton :carparkId="favourite.id" /></td>
        <td><MapButton :address="favourite.address" /></td>
        <td><RemoveButton :id="favourite.id"/></td>
        <DetailSideBar size="sm" :favourite="favourite" />
      </tr>

      <b-modal
        id="modal-prevent-closing"
        v-model="show"
        ref="modal"
        title="Enter new carpark name"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
        >
        <b-form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="New Carpark Name"
            label-for="name-input"
            invalid-feedback="Carpark name is required"
            :state="nameState"
          >
            <b-form-input
              id="name-input"
              v-model="name"
              :state="nameState"
              required
            ></b-form-input>
          </b-form-group>
        </b-form>
      </b-modal>
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
import {
  collection,
  getDocs,
  doc,
  updateDoc,
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
      name:"",
      nameState: null,
      submittedName: "",
      renamecarpark: "",
    };
  },

  methods: {
      async readData() {
      console.log("in readData")
      const querySnapshot = await getDocs(collection(db, String(this.user.email)));
      console.log("reading data for " + this.user.email)
      querySnapshot.forEach((doc) => {
        this.favourites.push(doc.data());
      });
    },

    setCarparkToRename(favourite) {
      console.log("setting renamecarpark to " + favourite.id);
      this.renamecarpark = favourite.id;
      console.log(this.renamecarpark)
    },

    async renameCarpark() {
      const carparkRef = doc(db, String(this.user.email), String(this.renamecarpark));

      await updateDoc(carparkRef, {
        name: this.submittedName,
      });

      window.location.reload();
    },

    checkFormValidity() {
      const valid = this.$refs.form[0].checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal() {
      this.name = ""
      this.nameState = null
    },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit();
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Set the submittedName to be name input by user
        this.submittedName = this.name;
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
        this.renameCarpark();
      }
  },

  mounted() {
    console.log("in mounted...")
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
      this.readData();
    });
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
