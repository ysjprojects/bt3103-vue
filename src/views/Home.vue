<template>
  <div class="home">
    <Favourites :details="details" />
    <Search :details="details" />
  </div>
</template>

<script>
import Favourites from "@/components/Favourites.vue";
import Search from "@/components/Search.vue";

export default {
  name: "Home",
  components: {
    Favourites,
    Search,
  },
  props: {
    details: Array,
  },
};
</script>
