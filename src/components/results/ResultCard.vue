<template>
  <b-card>
    <b-card-body>
      <b-card-title>Carpark {{ result.id }}</b-card-title>
      <b-card-text>{{ result.address }}</b-card-text>
      <MapButton address="BLK 686 JURONG WEST CENTRAL 1" />
      <DetailSideBar :result1="this.result" />
    </b-card-body>
  </b-card>
</template>


<script>
import MapButton from "./MapButton.vue";
import DetailSideBar from "./DetailSideBar.vue";
export default {
  data() {
    return {
      result1: this.result,
    };
  },

  name: "ResultCard",
  components: {
    MapButton,
    DetailSideBar,
  },

  props: {
    result: Object,
  },
};
</script>