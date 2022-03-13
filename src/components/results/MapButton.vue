<template>
  <b-button
    size="sm"
    target="_blank"
    :href="this.url"
    squared
    variant="primary"
  >
    <font-awesome-icon icon="fa-solid fa-route" />
    &nbsp;<b>Directions</b></b-button
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
