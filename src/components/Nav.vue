<template>
  <div>
    <b-modal id="modal-center" centered title="Welcome!" hide-footer="true">
      <SignInPage />
    </b-modal>
    <b-navbar class="fixed-top" type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item href="/">
          <p class="text-light bg-dark">Home</p>
        </b-nav-item>
        <!-- add in v-if=user -->
        <b-nav-item href="#favTable">
          <p class="text-light bg-dark">Favourites</p>
        </b-nav-item>
        <b-nav-item href="#searchOptions">
          <p class="text-light bg-dark">Search</p>
        </b-nav-item>
        <b-nav-item href="#resultsTop">
          <p class="text-light bg-dark">Results</p>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-button v-b-modal.modal-center variant="dark">Log In</b-button>

        <b-button href="/settings" variant="dark">
          <font-awesome-icon icon="fa-solid fa-gear"
        /></b-button>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import SignInPage from "@/components/SignInPage.vue";
export default {
  name: "Home",
  components: {
    SignInPage,
  },
};
</script>
