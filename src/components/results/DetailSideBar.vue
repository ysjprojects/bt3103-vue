<template>
  <div>
    <b-modal :id="`modal-${result.id}`"
      :title="`Carpark ${result.id}`" ref="modal">
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
import { getDocs, doc, setDoc, collection } from "firebase/firestore"
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

      const querySnapshot = await getDocs(collection(db, String(this.user.email)));

      querySnapshot.forEach((doc) => {
        if (doc.data().id == this.result.id) {
          alert("Carpark has been added to Favourites before.");
          this.$refs["modal"].hide();
          throw "Carpark has been added to Favourites before.";
          // return;
        }
      });

      try{
        const auth = getAuth()
        const cpuser = auth.currentUser.email;
        const docRef = await setDoc(doc(db, String(cpuser), this.result.id), {
          id: this.result.id, 
          name: this.result.address,
          address: this.result.address,
          shortTermParking: this.result.shortTermParking,
          parkingSystem: this.result.parkingSystem,
          freeParking: this.result.freeParking,
          nightParking: this.result.nightParking,
          capacity: this.result.capacity,
        })
        console.log("saved carpark " + this.result.id)
        alert("Added to Favourites")
        this.$root.$refs.Home.change()
        console.log("Calling change() function in Home")
      }
      catch(error){
        console.error(error);
      }

      this.$refs["modal"].hide();

    }
  }
};
</script>

<style></style>
