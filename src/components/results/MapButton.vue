<template>
  <b-button target="_blank" :href="this.url" squared variant="primary">
    <font-awesome-icon icon="fa-solid fa-location-dot" />
    &nbsp;Directions</b-button
  >
</template>


<script>
export default {
  name: "MapButton",
  props: {
    address: String,
  },
  computed: {
    url() {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURI(
        this.address
      )}`;
    },
  },
};
</script>
