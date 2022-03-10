<template>
  <div class="home">
    <Favourites />
    <Search />
    <Results :details="details" />
    <Sidebar />
    <SignIn />
  </div>
</template>

<script>
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
    this.details = [...new Set([...this.details, ...arr])];
    let total = res.data.result.total;
    let queries = [];
    for (let i = 100; i <= total; i += 100) {
      queries.push(
        axios.get(
          `https://data.gov.sg/api/action/datastore_search?offset=${i}&resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c`
        )
      );
    }

    Promise.all(queries).then(
      axios.spread((...responses) => {
        responses.forEach((res) => {
          console.log("fetching data...");
          this.details = [
            ...new Set([...this.details, ...res.data.result.records]),
          ];
        });
      })
    );

    console.log(queries);
  },
};
</script>
