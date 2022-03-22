<template>
  <div>
    <b-sidebar
      :id="`sidebar-${favourite.car_park_no}`"
      :title="`Carpark ${favourite.car_park_no}`"
      shadow
    >
      <div class="px-3 py-2">
        <!-- <p>Available lots: {{ favourite.Available_Lots }}</p> -->
        <p>Available lots: 2</p>
        <p>Carpark type: {{ favourite.car_park_type }}</p>
        <p>Type of parking system: {{ favourite.type_of_parking_system }}</p>
        <p>Free parking: {{ favourite.free_parking }}</p>
        <p>Short-term parking: {{ favourite.short_term_parking }}</p>
        <p>Night parking: {{ favourite.night_parking }}</p>
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
    favourite: Object,
  },
};
</script>
