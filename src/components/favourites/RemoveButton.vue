<template>
  <b-button
    squared
    size="sm"
    v-on:click="removeFavourite()"
    variant="secondary"
  >
    <font-awesome-icon icon="fa-solid fa-trash-can" /> &nbsp;
    <b>Remove</b></b-button
  >

</template>

<script>
import firebaseApp from "/src/firebase.ts";
import { getFirestore } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  name: "RemoveButton",
  props: {
    id: String,
  },
  methods: {
    removeFavourite: async function () {
      function reloadPage() {
        window.location.reload();
      }

      alert("This carpark will be removed from your list of Favourite Carparks");
      console.log("deleting carpark " + this.id);
      await deleteDoc(doc(db, "Carparks", this.id));
      console.log("Document successfully deleted!", this.id);
      reloadPage();
    },
  },
};
</script>
