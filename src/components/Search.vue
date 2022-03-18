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
        max="10"
        step="0.1"
      ></b-form-input>
      <div class="mt-2">Max Radius: {{ distance }}</div>
    </b-form-group>

    <!-- Buttons row -->
    <b-row>
      <b-col lg="1" class="pb-2"
        ><b-button variant="outline-success">Search</b-button></b-col
      >
      <b-col lg="2" class="pb-2"
        ><b-button v-b-toggle.advancedFilters
          >Advanced Filters
        </b-button></b-col
      >
    </b-row>
    <!-- Advanced Filters column -->
    <b-collapse id="advancedFilters" class="mt-2">
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

      <!-- Free Parking column -->
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
    </b-collapse>
    <Results :results="results" />
  </div>
</template>

<script>
import Results from "@/components/Results.vue";
export default {
  name: "Search",
  components: {
    Results,
  },
  props: {
    details: Array,
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

      //filter by distance
      console.log("distance is: " + this.distance);
      if (this.distance) {
        res = res.filter((d) => {
          return d.distance <= this.distance;
        });
      }

      switch (this.parkPay) {
        case "Any":
          break;
        case "Electronic":
          res = res.filter((d) => {
            return d.type_of_parking_system === "Electronic Parking";
          });
          break;
        case "Coupon":
          res = res.filter((d) => {
            return d.type_of_parking_system === "Coupon Parking";
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
            return d.short_term_parking === "No";
          });
          break;

        case "12 hour":
          res = res.filter((d) => {
            return d.short_term_parking === "7AM-7PM";
          });
          break;
        case "Whole Day":
          res = res.filter((d) => {
            return d.short_term_parking === "WHOLE DAY";
          });
          break;
        case "7am to 10:30pm":
          res = res.filter((d) => {
            return d.short_term_parking === "7AM-10.30PM";
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
            return d.free_parking === "No";
          });
          break;
        case "SundaysPH":
          res = res.filter((d) => {
            return d.free_parking === "SUN & PH FR 7AM-10.30PM";
          });
          break;
        default:
          res = [];
      }

      switch (this.parkNight) {
        case "Any":
          break;
        case "NO":
          res = res.filter((d) => {
            return d.night_parking == "NO";
          });
          break;
        case "YES":
          res = res.filter((d) => {
            return d.night_parking == "YES";
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
