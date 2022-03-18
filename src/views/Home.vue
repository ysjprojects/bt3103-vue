<template>
  <div class="home">
    <Favourites :details="details" />
    <Search :details="details" />
    <Sidebar />
  </div>
</template>

<script>
import Favourites from "@/components/Favourites.vue";
import Search from "@/components/Search.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "Home",
  components: {
    Favourites,
    Search,
    Sidebar,
  },
  props: {
    details: Array,
  },
};
</script>
