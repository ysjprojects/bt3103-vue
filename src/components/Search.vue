<template>
  <div class="container-fluid" id="favTable" style="border: solid; padding: 2%">
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
  </div>
</template>

<script>
export default {
  computed: {
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
        { value: "Electronic", text: "Electronic" },
        { value: "Coupon", text: "Coupon" },
      ],
      parkTerm: "Any",
      parkTermOptions: [
        { value: "Any", text: "Any" },
        { value: "No", text: "No Short Term Parking" },
        { value: "12 hour", text: "7am - 7pm" },
        { value: "Full Day", text: "Full Day" },
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
