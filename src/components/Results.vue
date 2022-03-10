<template>
  <b-container fluid="xl" style="border: solid; padding: 2%">
    <b-row cols="1" cols-md="2" cols-xl="3">
      <b-col class="mb-3" v-for="result in results" :key="result.id">
        <ResultCard :result="result" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ResultCard from "./results/ResultCard.vue";

export default {
  name: "Results",
  components: {
    ResultCard,
  },
  props: {
    details: Array,
  },

  computed: {
    results: function () {
      return this.details.map((d) => {
        let distance = Math.floor(Math.random() * 30);
        let capacity = Math.floor(Math.random() * 500);
        let numLots = Math.floor(Math.random() * capacity);
        return {
          id: d.car_park_no,
          address: d.address,
          distance: distance,
          capacity: capacity,
          numLots: numLots,
        };
      });
    },
  },
};
</script>
