<template>
  <div id="app">
    <Nav />
    <router-view :details="details" />
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    Nav,
  },
  data() {
    return {
      details: [],
      noCache: false,
    };
  },
  async created() {
    let nextUpdate = localStorage.getItem("nextUpdate");
    let cachedData = localStorage.getItem("cachedData");
    let now = new Date();
    if (
      nextUpdate === null ||
      cachedData === null ||
      now.getTime() > parseInt(nextUpdate) ||
      this.noCache
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

      let coords = this.details.map((d) => {
        return { x: d.x_coord, y: d.y_coord };
      });

      queries = [];
      let latlongarr = [];

      coords.forEach((c) => {
        queries.push(
          axios.get(
            `https://developers.onemap.sg/commonapi/convert/3414to4326?X=${c.x}&Y=${c.y}`
          )
        );
      });

      await Promise.all(queries).then(
        axios.spread((...responses) => {
          responses.forEach((res) => {
            console.log("fetching data...");
            latlongarr.push({
              lat: res.data.latitude,
              long: res.data.longitude,
            });
          });
        })
      );

      if (this.details.length === 0) {
        console.log("Error! details array is empty");
        return;
      }

      if (this.details.length !== latlongarr.length) {
        console.log(
          `Error! details array and coordinates array are of different lengths: ${this.details.length} -- ${latlongarr.length}`
        );
        return;
      }

      for (let i = 0; i < this.details.length; i++) {
        this.details[i] = Object.assign(this.details[i], latlongarr[i]);
      }

      console.log(this.details);
      localStorage.setItem("cachedData", JSON.stringify(this.details));
      localStorage.setItem("nextUpdate", new Date().setDate(now.getDate() + 7)); //recache 7 days from now
    } else {
      this.details = JSON.parse(localStorage.getItem("cachedData"));
    }
  },
};
</script>
