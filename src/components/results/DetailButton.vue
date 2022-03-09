<template>
  <b-button squared size="sm" v-b-toggle="`sidebar-${carparkId}`"
    ><b>Carpark Details</b></b-button
  >
</template>

<script>
export default {
  name: "DetailButton",
  props: {
    carparkId: String,
  },
};
</script>

<style>
</style>