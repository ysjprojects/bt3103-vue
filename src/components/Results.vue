<template>
  <b-container style="border: solid; padding: 2%">
    <b-row>
      <b-col
        class="mb-2"
        v-for="result in results"
        :key="result.id"
        md="6"
        xl="4"
      >
        <ResultCard :result="result" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ResultCard from "./results/ResultCard.vue";
import { results } from "./results/testdata";

export default {
  name: "Results",
  components: {
    ResultCard,
  },
  data() {
    return {
      results: results,
    };
  },
};
</script>
