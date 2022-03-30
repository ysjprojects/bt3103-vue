<template>
  <div class="home">
    <Favourites :details="details" :key="refreshComp"/>
    <Search :details="details"/>
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

  data() {
    return {
      refreshComp: 0,
    }
  },

  created() {
    this.$root.$refs.Home = this;
  },

  methods: {
    change() {
      this.refreshComp += 1;
    }
  },

  props: {
    details: Array,
  },
};
</script>
