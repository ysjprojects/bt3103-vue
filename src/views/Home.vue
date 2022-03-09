<template>
  <div class="home">
    <Favourites />
    <Search />
    <Results />
    <Sidebar />
    <SignIn />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Favourites from "@/components/Favourites.vue";
import Search from "@/components/Search.vue";
import Results from "@/components/Results.vue";
import Sidebar from "@/components/Sidebar.vue";
import SignIn from "@/components/SignIn.vue";

@Component({
  components: {
    Favourites,
    Search,
    Results,
    Sidebar,
    SignIn,
  },
})
export default class Home extends Vue {}
</script>
