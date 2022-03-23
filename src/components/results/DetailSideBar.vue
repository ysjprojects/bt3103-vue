<template>
  <div>
    <b-modal :id="`modal-${result.id}`"
      :title="`Carpark ${result.id}`">
      <p>Total Number of Lots: {{ result.capacity }}</p>
      <p>Available Lots: {{ result.numLots }}</p>
      <p>Distance: {{ result.distance.toFixed(1) }} km away</p>
      <p>Type of Parking System: {{ result.parkingSystem }}</p>
      <p>Free Parking: {{ result.freeParking }}</p>
      <p>Short Term Parking: {{ result.shortTermParking }}</p>
      <p>Night Parking: {{ result.nightParking }}</p>

      <template #modal-footer="{add, close}">
        <b-button size="sm" variant="success" v-if="user" @click="addToFavourites()">
          Add to Favourites
        </b-button>
        <b-button size="sm" @click="close()">
          Close
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import firebaseApp from "/src/firebase.ts"
import { getFirestore } from "firebase/firestore"
import {doc, setDoc } from "firebase/firestore"
const db = getFirestore(firebaseApp);
import { getAuth, onAuthStateChanged } from "firebase/auth"

export default {
  name: "DetailSideBar",

  props: {
    result: Object,
  },

  data() {
    return {
      user:false,
    }
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    })

  },

  methods: {
    async addToFavourites() {
      alert("Adding to Favourites")

      try{
        const auth = getAuth()
        const cpuser = auth.currentUser.email;
        const docRef = await setDoc(doc(db, String(cpuser), this.result.id), {
          id: this.result.id, 
          name: this.result.id,
          address: this.result.address,
          shortTermParking: this.result.shortTermParking,
          parkingSystem: this.result.parkingSystem,
          freeParking: this.result.freeParking,
          nightParking: this.result.nightParking,
          capacity: this.result.capacity,
        })
        console.log("saved carpark " + this.result.id)
        //this.$emit("added")
      }
      catch(error){
        console.error(error);
      }

    }
  }
};
</script>

<style></style>
