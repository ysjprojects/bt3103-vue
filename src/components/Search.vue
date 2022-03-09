<template>
  <div class="container-fluid" id="favTable" style="border: solid; padding: 2%">
    <h4>Find Carparks</h4>
    <b-form-group
      id="regionGroup"
      description="Select the target region"
      label="Select Region"
      label-for="region"
    >
      <b-form-select v-model="region" :options="regionOptions"></b-form-select>
    </b-form-group>
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
    <b-collapse id="advancedFilters" class="mt-2">
      <b-form-group
        id="parkPayGroup"
        description="Select the preferred Parking System"
        label="Parking System"
        label-for="parkPay"
      >
        <b-form-select
          v-model="parkPay"
          :options="parkPayOptions"
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
      region: "Any",
      regionOptions: [
        { value: "Any", text: "Any" },
        { value: "Central", text: "Central" },
        { value: "East", text: "East" },
        { value: "West", text: "West" },
        { value: "North", text: "North" },
      ],
      postalCode: "",
      parkPay: "Any",
      parkPayOptions: [
        { value: "Any", text: "Any" },
        { value: "Electronic", text: "Electronic" },
        { value: "Coupon", text: "Coupon" },
      ],
    };
  },
};
</script>
