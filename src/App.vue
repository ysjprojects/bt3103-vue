<template>
  <div id="app">
    <b-overlay :show="isLoading" rounded="sm">
      <Nav />
      <router-view :details="details" />
      <template #overlay>
        <div class="text-center">
          <p>
            <b-spinner label="Spinning"></b-spinner>
          </p>
          <p>Loading assets, please wait...</p>
        </div>
      </template>
    </b-overlay>
    <b-button class="mt-3" @click="isLoading = !isLoading"
      >Toggle overlay</b-button
    >
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import axios from "axios";

import { XYToLatLong } from "./coordconverter.ts";

export default {
  name: "App",
  components: {
    Nav,
  },
  data() {
    return {
      details: [],
      noCache: true,
      isLoading: true,
    };
  },
  async created() {
    let nextUpdate = localStorage.getItem("nextUpdate");
    let cachedData = localStorage.getItem("cachedData");
    let now = new Date();
    if (
      nextUpdate === null ||
      cachedData === null ||
      now.getTime() > parseInt(nextUpdate)
    ) {
      let res = await axios.get(
        "https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c"
      );
      let arr = res.data.result.records;
      this.details = [...this.details, ...arr].filter(
        (v, i, a) => a.findIndex((t) => t.car_park_no === v.car_park_no) === i
      );
      let total = res.data.result.total;
      let queries = [];
      for (let i = 100; i <= total; i += 100) {
        queries.push(
          axios.get(
            `https://data.gov.sg/api/action/datastore_search?offset=${i}&resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c`
          )
        );
      }

      await Promise.all(queries).then(
        axios.spread((...responses) => {
          responses.forEach((res) => {
            console.log("fetching data...");
            this.details = [...this.details, ...res.data.result.records].filter(
              (v, i, a) =>
                a.findIndex((t) => t.car_park_no === v.car_park_no) === i
            );
          });
        })
      );

      this.details.forEach((d) => {
        let x = parseFloat(d.x_coord);
        let y = parseFloat(d.y_coord);
        let [lat, long] = XYToLatLong(x, y);
        d = Object.assign(d, { lat: lat, long: long });
      });

      console.log(this.details);
      localStorage.setItem("cachedData", JSON.stringify(this.details));
      localStorage.setItem("nextUpdate", new Date().setDate(now.getDate() + 7)); //recache 7 days from now
    } else {
      this.details = JSON.parse(localStorage.getItem("cachedData"));
    }
    this.isLoading = false;
  },
};
</script>
