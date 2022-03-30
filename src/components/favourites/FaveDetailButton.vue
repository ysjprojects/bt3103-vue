<template>
  <b-button
    squared
    size="sm"
    variant="info"
    v-b-modal="`modal-fave-${carparkId}`"
  >
    <font-awesome-icon icon="fa-solid fa-circle-info" /> &nbsp;
    <b>Carpark Details</b></b-button
  >
</template>

<script>
export default {
  name: "FaveDetailButton",
  props: {
    carparkId: String,
  },
};
</script>

<style></style>
