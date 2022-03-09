<template>
  <b-button class="btn btn-secondary" v-on:click="removeFavourite()" variant="primary">
  <font-awesome-icon icon="fa-solid fa-trash-can" /> &nbsp;  <b>Remove</b></b-button>
</template>


<script>
export default {
  name: "RemoveButton",
  props: {
    address: String,
  },
  methods:{
      removeFavourite(){
          alert("You are about to remove this carpark from your favourite list")
      }

  }
};
</script>

<style scoped>

</style>