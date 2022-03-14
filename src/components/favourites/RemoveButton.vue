<template>
  <b-button v-on:click="removeFavourite()" variant="secondary">
  <font-awesome-icon icon="fa-solid fa-trash-can" /> &nbsp; <b>Remove</b></b-button>
</template>

<script>
import { firebaseApp } from '/src/firebase.ts';
import { getFirestore } from "firebase/firestore"
import { doc, deleteDoc } from "firebase/firestore";
// import {readData} from "../Favourites.vue";

const db = getFirestore(firebaseApp);

export default {
  name: "RemoveButton",
  props: {
    id: String,
  },
  methods:{
    removeFavourite: async function(){

      function reloadPage() {
        window.location.reload();
      }

      alert(this.id + " will be removed from your list of Favourite Carparks");
      console.log("deleting carpark " + this.id)
      await deleteDoc(doc(db,"Carparks", this.id))
      console.log("Document successfully deleted!", this.id);
      reloadPage();

      // let tb = document.getElementById("table");
      // console.log(tb.rows.length);
      // while (tb.rows.length > 1){
      //   tb.deleteRow(1)
      // }
      // readData();
    }
  }
};
</script>