<template>
  <div
    class="container-fluid"
    id="searchOptions"
    style="border: solid; padding: 2%"
  >
    <h4>Find Carparks</h4>
    <!-- Postal Code Entry -->
    <b-form-group
      id="postalGroup"
      description="Enter your current Location (Postal Code)"
      label="Current Location"
      label-for="postalCode"
      valid-feedback="Approved Postal Code."
      :invalid-feedback="invalidFeedback"
      :state="state"
    >
      <b-form-input v-model="postalCode" :state="state" trim></b-form-input>
    </b-form-group>
    <!-- Distance Slider -->
    <b-form-group
      id="sliderGroup"
      description="Select search radius from your location"
      label="Maximum Radius"
    >
      <b-form-input
        id="range-1"
        v-model="distance"
        type="range"
        min="0"
        max="5"
        step="0.1"
      ></b-form-input>
      <div class="mt-2">Max Radius: {{ distance }}</div>
    </b-form-group>

    <!-- Buttons row -->
    <b-row>
      <b-col lg="1" class="pb-2"
        ><b-button @click="postalCodeToLatLong" variant="outline-success"
          >Search</b-button
        ></b-col
      >
      <b-col lg="2" class="pb-2"
        ><b-button v-b-toggle.advancedFilters
          >Advanced Filters
        </b-button></b-col
      >
    </b-row>
    <!-- Advanced Filters column -->
    <b-collapse id="advancedFilters" class="mt-2">
      <b-row>
        <b-col>
          <!-- Parking payment options column -->
          <b-form-group
            id="parkPayGroup"
            description="Select the preferred Parking Payment"
            label="Parking Payment"
            label-for="parkPay"
          >
            <b-form-select
              v-model="parkPay"
              :options="parkPayOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <!-- Short Term Parking column -->
          <b-form-group
            id="parkTermGroup"
            description="Select the Short Term Parking Options"
            label="Short Term Parking"
            label-for="parkTerm"
          >
            <b-form-select
              v-model="parkTerm"
              :options="parkTermOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <!-- Free Parking column -->
          <b-form-group
            id="parkFreeGroup"
            description="Select Free Parking Options"
            label="Free Parking"
            label-for="parkFree"
          >
            <b-form-select
              v-model="parkFree"
              :options="parkFreeOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <!-- Night Parking column -->
          <b-form-group
            id="parkNightGroup"
            description="Select Night Parking Options"
            label="Night Parking"
            label-for="parkNight"
          >
            <b-form-select
              v-model="parkNight"
              :options="parkNightOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </b-collapse>
    <Results :results="results" />
  </div>
</template>

<script>
import Results from "@/components/Results.vue";
import axios from "axios";
import { getDistanceBetweenLatLongCoords } from "../coordconverter.ts";
export default {
  name: "Search",
  components: {
    Results,
  },
  props: {
    details: Array,
  },
  methods: {
    postalCodeToLatLong: async function () {
      let res = await axios.get(
        `https://developers.onemap.sg/commonapi/search?searchVal=${this.postalCode}&returnGeom=Y&getAddrDetails=Y`
      );
      this.locationLatLong = {
        lat: res.data.results[0].LATITUDE,
        lng: res.data.results[0].LONGITUDE,
      };
      console.log(this.locationLatLong);
    },
  },
  computed: {
    results: function () {
      let res = this.details.map((d) => {
        let latLongObj = {
          lat: d.lat,
          lng: d.long,
        };
        let distance = getDistanceBetweenLatLongCoords(
          this.locationLatLong,
          latLongObj
        );
        let capacity = Math.floor(Math.random() * 500);
        let numLots = Math.floor(Math.random() * capacity);
        return {
          id: d.car_park_no,
          address: d.address,
          shortTermParking: d.short_term_parking,
          parkingSystem: d.type_of_parking_system,
          freeParking: d.free_parking,
          nightParking: d.night_parking,
          distance: distance,
          capacity: capacity,
          numLots: numLots,
        };
      });

      console.log("bef");
      console.log(res);
      console.log("aft");

      //filter by distance
      console.log("distance is: " + this.distance);
      res = res.filter((d) => {
        return d.distance <= this.distance;
      });

      switch (this.parkPay) {
        case "Any":
          break;
        case "Electronic":
          res = res.filter((d) => {
            return d.parkingSystem === "ELECTRONIC PARKING";
          });
          break;
        case "Coupon":
          res = res.filter((d) => {
            return d.parkingSystem === "COUPON PARKING";
          });
          break;
        default:
          res = []; //error: assign empty arr to res
      }

      switch (this.parkTerm) {
        case "Any":
          break;
        case "No":
          res = res.filter((d) => {
            return d.shortTermParking === "No";
          });
          break;

        case "12 hour":
          res = res.filter((d) => {
            return d.shortTermParking === "7AM-7PM";
          });
          break;
        case "Whole Day":
          res = res.filter((d) => {
            return d.shortTermParking === "WHOLE DAY";
          });
          break;
        case "7am to 10:30pm":
          res = res.filter((d) => {
            return d.shortTermParking === "7AM-10.30PM";
          });
          break;
        default:
          res = []; //error: assign empty arr to res
      }

      switch (this.parkFree) {
        case "Any":
          break;
        case "No":
          res = res.filter((d) => {
            return d.freeParking === "No";
          });
          break;
        case "SundaysPH":
          res = res.filter((d) => {
            return d.freeParking === "SUN & PH FR 7AM-10.30PM";
          });
          break;
        default:
          res = [];
      }

      switch (this.parkNight) {
        case "Any":
          break;
        case "No":
          res = res.filter((d) => {
            return d.nightParking === "NO";
          });
          break;
        case "Yes":
          res = res.filter((d) => {
            return d.nightParking === "YES";
          });
          break;
        default:
          res = []; //error: assign empty arr to res
      }

      console.log(res);

      return res;
    },
    state() {
      if (this.postalCode.length == 6) {
        return isNaN(Number(this.postalCode)) == false;
      }
      return false;
    },
    invalidFeedback() {
      if (isNaN(Number(this.postalCode))) {
        return "Postal Code needs to be a number.";
      } else if (this.postalCode.length != 6) {
        return "Postal Code needs to be 6 digits.";
      }
      return "Please insert a valid postal code.";
    },
  },
  data() {
    return {
      distance: "5",
      postalCode: "",
      locationLatLong: {},
      parkPay: "Any",
      parkPayOptions: [
        { value: "Any", text: "Any" },
        { value: "Electronic", text: "Electronic Parking" },
        { value: "Coupon", text: "Coupon Parking" },
      ],
      parkTerm: "Any",
      parkTermOptions: [
        { value: "Any", text: "Any" },
        { value: "No", text: "No Short Term Parking" },
        { value: "12 hour", text: "7am - 7pm" },
        { value: "7am to 10:30pm", text: "7am - 10:30pm" },
        { value: "Whole Day", text: "Whole Day" },
      ],
      parkFree: "Any",
      parkFreeOptions: [
        { value: "Any", text: "Any" },
        { value: "No", text: "No Free Parking" },
        { value: "SundaysPH", text: "Sundays and Public Holidays" },
      ],
      parkNight: "Any",
      parkNightOptions: [
        { value: "Any", text: "Any" },
        { value: "No", text: "No Night Parking" },
        { value: "Yes", text: "Include Night Parking" },
      ],
    };
  },
};
</script>
