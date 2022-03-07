<template>
  <div class="home">
    <Nav/>
    <Favourites/>
    <Search/>
    <Results/>
    <Sidebar/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Nav from '@/components/Nav.vue'
import Favourites from '@/components/Favourites.vue'
import Search from '@/components/Search.vue'
import Results from '@/components/Results.vue'
import Sidebar from '@/components/Sidebar.vue'

@Component({
  components: {
    Nav,
    Favourites,
    Search,
    Results,
    Sidebar
  },
})
export default class Home extends Vue {}
</script>
