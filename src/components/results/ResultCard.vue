<template>
  <b-card
    style="border-width: medium; height: 100%"
    :border-variant="getColor(result.capacity, result.numLots)"
  >
    <b-card-title
      ><b
        >{{ result.id }}
        <b-badge :variant="getColor(result.capacity, result.numLots)"
          >{{ result.numLots }} lots left</b-badge
        >
        <span style="font-size: 1rem" class="text-muted">
          &nbsp; {{ result.distance }} km away</span
        >
      </b></b-card-title
    >
    <b-card-text>{{ result.address }}</b-card-text>
    <b-button-group>
      <MapButton :address="result.address" />
      <DetailButton :carparkId="result.id" />
    </b-button-group>

    <DetailSideBar size="sm" :result="result" />
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

  data() {
    return {
      LOW: 5,
      HIGH: 25,
    };
  },

  methods: {
    getColor: function (total, available) {
      let percentage = (available * 100) / total;
      if (percentage < 5) return "danger";
      else if (percentage > 25) return "success";
      return "warning";
    },
  },
};
</script>
