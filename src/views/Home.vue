<template>
  <div class="home">
    <Favourites />
    <Search />
    <Results :details="details" />
    <Sidebar />
    <SignIn />
  </div>
</template>

<script lang="ts">
import Favourites from "@/components/Favourites.vue";
import Search from "@/components/Search.vue";
import Results from "@/components/Results.vue";
import Sidebar from "@/components/Sidebar.vue";
import SignIn from "@/components/SignIn.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Favourites,
    Search,
    Results,
    Sidebar,
    SignIn,
  },
  data() {
    return {
      details: [],
    };
  },
  async mounted() {
    let res = await axios.get(
      "https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c"
    );
    let arr = res.data.result.records;
    this.details = arr;
  },
};
</script>
