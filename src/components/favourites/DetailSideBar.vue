<template>
  <div>
    <b-modal :id="`modal-${favourite.id}`"
      :title="`Carpark ${favourite.id}`">
      <p>Total Number of Lots: {{ favourite.capacity }}</p>
      <p>Type of Parking System: {{ favourite.parkingSystem }}</p>
      <p>Free Parking: {{ favourite.freeParking }}</p>
      <p>Short Term Parking: {{ favourite.shortTermParking }}</p>
      <p>Night Parking: {{ favourite.nightParking }}</p>
    </b-modal>
  </div>
</template>

<script>
import firebaseApp from "/src/firebase.ts"
import { getFirestore } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"

const db = getFirestore(firebaseApp);

export default {
  name: "DetailSideBar",

  props: {
    favourite: Object,
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
  }
};
</script>
