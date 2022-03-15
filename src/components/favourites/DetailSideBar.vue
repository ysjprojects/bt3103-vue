<template>
  <div>
    <b-sidebar
      :id="`sidebar-${favourite.id}`"
      :title="`Carpark ${favourite.id}`"
      shadow
    >
      <div class="px-3 py-2">
        <p>Available lots: {{ favourite.Available_Lots }}</p>
        <p>Type of parking system: {{ favourite.type_of_parking_system }}</p>
        <p>Free parking: {{ favourite.free_parking }}</p>
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
