<template>
  <b-container
    v-if="this.results.length > 0"
    id="resultsTop"
    fluid
    class="mt-5"
  >
    <b-row class="mb-5">
      <b-button
        class="rounded-pill"
        variant="info"
        @click="toggleSortBy"
        ref="sortByBtn"
        >Sorted By: Availability</b-button
      >&nbsp;&nbsp;

      <b-button
        class="rounded-pill"
        variant="warning"
        @click="toggleIncludeZeroLots"
        ref="includeZeroLotsBtn"
        >Full Carparks Hidden</b-button
      >
    </b-row>
    <b-row cols="1" cols-md="2" cols-xl="3">
      <b-col class="mb-3" v-for="result in renderedResults" :key="result.id">
        <ResultCard :result="result" />
      </b-col>
    </b-row>
    <b-row class="justify-content-center" v-if="!hasReachedEnd">
      <b-button-group>
        <b-button @click="renderMoreResults()" variant="secondary"
          >Read more</b-button
        >
        <b-button href="#resultsTop" variant="primary">Back to top</b-button>
      </b-button-group>
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
    results: Array,
  },

  data() {
    return {
      RENDER_COUNT: 96,
      sortBy: "A", //default: sort by availability | 'D': sort by distance
      includeZeroLots: false, //default: omit zero lots
      renderedResults: [],
    };
  },

  watch: {
    results: {
      deep: true,
      handler: function (newVal, oldVal) {
        this.renderedResults = [];
        this.renderMoreResults();
        console.log(newVal);
      },
    },
    filteredResults: {
      deep: true,
      handler: function (newVal, oldVal) {
        this.renderedResults = [];
        this.renderMoreResults();
        console.log(newVal);
      },
    },
  },

  methods: {
    toggleIncludeZeroLots: function () {
      this.includeZeroLots = !this.includeZeroLots;
      this.$refs.includeZeroLotsBtn.innerText = this.includeZeroLots
        ? "Full Carparks Shown"
        : "Full Carparks Hidden";
    },
    toggleSortBy: function () {
      if (this.sortBy == "A") {
        this.sortBy = "D";
        this.$refs.sortByBtn.innerText = "Sorted By: Distance";
      } else {
        this.sortBy = "A";
        this.$refs.sortByBtn.innerText = "Sorted By: Availability";
      }
    },
    setcurrentLocationFilter: function (bool) {
      this.currentLocationFilter = bool;
    },
    renderMoreResults: async function () {
      let startIndex = this.renderedResults.length;
      let endIndex =
        this.filteredResults.length - this.RENDER_COUNT >=
        this.renderedResults.length
          ? startIndex + this.RENDER_COUNT - 1
          : this.filteredResults.length - 1;

      for (let i = startIndex; i <= endIndex; i++) {
        this.renderedResults.push(this.filteredResults[i]);
      }
    },
  },

  computed: {
    filteredResults: function () {
      let res = this.results;

      if (!this.includeZeroLots) {
        res = res.filter((d) => {
          return d.numLots > 0;
        });
      }

      switch (this.sortBy) {
        case "A":
          res = res.sort((a, b) =>
            (a.numLots * 100) / a.capacity < (b.numLots * 100) / b.capacity
              ? 1
              : -1
          );
          break;
        case "D":
          res = res.sort((a, b) => (a.distance > b.distance ? 1 : -1));
          break;
        default:
          res = []; //Error, return empty array
      }

      console.log(res);

      return res;
    },
    hasReachedEnd: function () {
      return this.filteredResults.length === this.renderedResults.length;
    },
  },
};
</script>
