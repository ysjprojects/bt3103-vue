<template>
  <b-card>
    <b-card-body>
      <b-card-title>Carpark {{ result.id }}</b-card-title>
      <b-card-text>{{ result.address }}</b-card-text>
      <MapButton address="BLK 686 JURONG WEST CENTRAL 1" />
    </b-card-body>
  </b-card>
</template>


<script>
import MapButton from "./MapButton.vue";
export default {
  name: "ResultCard",
  components: {
    MapButton,
  },
  props: {
    result: Object,
  },
};
</script>