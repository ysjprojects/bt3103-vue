<template>
  <div>
    <b-form-select v-model="region" :options="regionOptions"></b-form-select>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        region: null,
        regionOptions: [
          { value: 'Any', text: 'Any' },
          { value: 'Central', text: 'Central' },
          { value: 'East', text: 'East' },
          { value: 'West', text: 'West'},
          { value: 'North', text: 'North'},
        ]
      }
    }
  }
</script>