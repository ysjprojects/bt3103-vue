<template>
  <div class="home">
    <Favourites />
    <Search />
    <Results :details="details" />
    <Sidebar />
    <SignIn />
  </div>
</template>

<script>
import Favourites from "@/components/Favourites.vue";
import Search from "@/components/Search.vue";
import Results from "@/components/Results.vue";
import Sidebar from "@/components/Sidebar.vue";
import SignIn from "@/components/SignIn.vue";

export default {
  name: "Home",
  components: {
    Favourites,
    Search,
    Results,
    Sidebar,
    SignIn,
  },
  props: {
    details: Array,
  },
};
</script>
