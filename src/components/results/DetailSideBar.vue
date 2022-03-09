<template>
  <div>
    <b-button v-b-toggle.sidebar-1>Carpark Details</b-button>
    <b-sidebar id="sidebar-1" :title=result1.id shadow>
      <div class="px-3 py-2">
        <p>
          Region: {{result1.region}}
        </p>
        <p>
          Number of Lots: {{result1.numLots}}
        </p>
        <p>
          Distance: {{result1.distance}}
        </p>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
    name: "DetailSideBar",
    props: {
        result1: Object,
    }
}
</script>

<style>

</style>