<template>
  <!-- <b-button
    squared
    size="sm"
    v-b-toggle="`modal-${carparkId}`"
    variant="info"
  > -->
  <b-button v-b-modal="`modal-${carparkId}`">
    <font-awesome-icon icon="fa-solid fa-circle-info" /> &nbsp;
    <b>Carpark Details</b></b-button
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

<style></style>
