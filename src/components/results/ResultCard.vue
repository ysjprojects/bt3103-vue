<template>
  <b-card>
    <b-card-body>
      <b-card-title>Carpark {{ result.id }}</b-card-title>
      <b-card-text>{{ result.address }}</b-card-text>
      <b-button-group>
        <MapButton :address="result.address" />
        <DetailButton :carparkId="result.id" />
      </b-button-group>

      <DetailSideBar size="sm" :result="result" />
    </b-card-body>
  </b-card>
</template>


<script>
import MapButton from "./MapButton.vue";
import DetailButton from "./DetailButton.vue";
import DetailSideBar from "./DetailSideBar.vue";
export default {
  name: "ResultCard",
  components: {
    MapButton,
    DetailSideBar,
    DetailButton,
  },

  props: {
    result: Object,
  },
};
</script>