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
      <b-form-input
        v-model="postalCode"
        :state="state" trim
      ></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
export default {
  computed: {
    state() {
      return this.postalCode.length >= 6;
    },
    invalidFeedback() {
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
    };
  },
};
</script>
