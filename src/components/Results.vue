<template>
  <b-container fluid="xl" style="border: solid; padding: 2%">
    <b-row cols="1" cols-md="2" cols-xl="3">
      <b-col class="mb-2" v-for="result in results" :key="result.id">
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
        return {
          id: d.car_park_no,
          address: d.address,
          distance: 5,
          capacity: 4,
          numLots: 1,
        };
      });
    },
  },
};
</script>
