<template>
  <b-card
    style="border-width: medium; height: 100%"
    :border-variant="getColor(result.capacity, result.numLots)"
  >
    <b-card-title
      ><b
        >{{ result.id }}
        <b-button
          ref="availabilityDisplay"
          @click="toggleAvailabilityDisplay(result)"
          size="sm"
          :variant="getColor(result.capacity, result.numLots)"
          ><b>{{ result.numLots }}/{{ result.capacity }} lots left</b></b-button
        >
        <span style="font-size: 1rem" class="text-muted">
          &nbsp; {{ result.distance.toFixed(1) }} km away</span
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
    getPercentageFilled: function (total, available) {
      if (total < 1) return 100.0;
      return 100.0 - (available * 100) / total;
    },
    getColor: function (total, available) {
      if (total < 1) return "danger";
      let percentage = (available * 100) / total;
      if (percentage < 5) return "danger";
      else if (percentage > 25) return "success";
      return "warning";
    },
    toggleAvailabilityDisplay: function (result) {
      let t = this.$refs.availabilityDisplay.innerText;
      let lastchar = t.charAt(t.length - 1);
      console.log(lastchar);
      switch (lastchar) {
        case "t":
          this.$refs.availabilityDisplay.innerHTML =
            "<b>" +
            this.getPercentageFilled(result.capacity, result.numLots).toFixed(
              2
            ) +
            "% capacity filled" +
            "</b>";
          break;
        case "d":
          this.$refs.availabilityDisplay.innerHTML =
            "<b>" +
            result.numLots +
            "/" +
            result.capacity +
            " lots left" +
            "</b>";
          break;
        default:
          this.$refs.availabilityDisplay.innerHTML = "<b>ERROR</b>";
      }
    },
  },
};
</script>
