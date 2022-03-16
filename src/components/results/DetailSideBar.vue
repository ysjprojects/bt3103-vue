<template>
  <div>
    <b-sidebar
      :id="`sidebar-${result.id}`"
      :title="`Carpark ${result.id}`"
      shadow
    >
      <div class="px-3 py-2">
        <p>Number of Lots: {{ result.capacity }}</p>
        <p>Available Lots: {{ result.numLots }}</p>
        <p>Distance: {{ result.distance }}</p>
        <p>Address: {{ result.address }}</p>
        <p>Free parking: {{ result.free_parking }}</p>
        <b-img
          src="https://picsum.photos/500/500/?image=54"
          fluid
          thumbnail
        ></b-img>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "DetailSideBar",
  props: {
    result: Object,
  },
};
</script>

<style></style>
