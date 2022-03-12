<template>
  <b-container fluid="xl" style="border: solid; padding: 2%">
    <b-row cols="1" cols-md="2" cols-xl="3">
      <b-col class="mb-3" v-for="result in renderedResults" :key="result.id">
        <ResultCard :result="result" />
      </b-col>
    </b-row>
    <b-row v-if="!hasReachedEnd">
      <b-button @click="renderMoreResults()" variant="secondary"
        >Read more</b-button
      >
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

  data() {
    return {
      RENDER_COUNT: 48,
      MAX_DISTANCE: 5,
      currentLocationFilter: true,
      availabilitySortDesc: true,
      includeZeroLots: false,
      renderedResults: [],
    };
  },

  methods: {
    setcurrentLocationFilter: function (bool) {
      this.currentLocationFilter = bool;
    },
    renderMoreResults: function () {
      let startIndex = this.renderedResults.length;
      let endIndex =
        this.results.length - this.RENDER_COUNT > this.renderedResults.length
          ? startIndex + this.RENDER_COUNT - 1
          : this.results.length - 1;

      for (let i = startIndex; i <= endIndex; i++) {
        this.renderedResults.push(this.results[i]);
      }
    },
  },

  mounted() {
    this.renderMoreResults();
  },

  computed: {
    results: function () {
      let res = this.details.map((d) => {
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

      if (this.currentLocationFilter) {
        res = res.filter((d) => {
          return d.distance <= this.MAX_DISTANCE;
        });
      }

      if (!this.includeZeroLots) {
        res = res.filter((d) => {
          return d.numLots > 0;
        });
      }

      if (this.availabilitySortDesc) {
        res = res.sort((a, b) =>
          (a.numLots * 100) / a.capacity < (b.numLots * 100) / b.capacity
            ? 1
            : -1
        );
      } else {
        res = res.sort((a, b) =>
          (a.numLots * 100) / a.capacity < (b.numLots * 100) / b.capacity
            ? -1
            : 1
        );
      }

      console.log(res);

      return res;
    },
    hasReachedEnd: function () {
      return (
        this.results.length - this.RENDER_COUNT <= this.renderedResults.length
      );
    },
  },
};
</script>
