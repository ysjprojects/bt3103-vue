<template>
  <div class="container-fluid" id="favTable" style="border: solid; padding: 2%">
    <p>Task 1 - Link to Google maps based on address given</p>
    <p>Example: BLK 686 JURONG WEST CENTRAL 1</p>
    <MapButton address="BLK 686 JURONG WEST CENTRAL 1" />
  </div>
</template>

<script>
import MapButton from "@/components/results/MapButton.vue";
export default {
  name: "Results",
  components: {
    MapButton,
  },
};
</script>
