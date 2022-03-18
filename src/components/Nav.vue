<template>
  <!-- <div class="container-fluid" id="favTable" style="border: solid; padding: 2%">
    <router-link to="/SignIn">SignIn</router-link>
    <router-link to="/SignUp">SignUp</router-link>
    <router-link to="/">Home</router-link>
  </div> -->
  <div>
    <b-navbar class="fixed-top" type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item href="/"> Home</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item href="#favTable">Favourites</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item href="#searchOptions">Search</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item href="#resultsTop">Results</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <div>
          <b-button v-b-modal.modal-center variant="dark">Log In</b-button>
          <b-modal
            id="modal-center"
            centered
            title="Welcome!"
            hide-footer="true"
          >
            <SignInPage />
          </b-modal>
        </div>
        <!-- <div>
          <b-nav-item href="/Settings">
            <font-awesome-icon icon="fa-solid fa-gear"
          /></b-nav-item>
        </div> -->
        <div>
          <b-button href="/settings" variant="dark">
            <font-awesome-icon icon="fa-solid fa-gear"
          /></b-button>
        </div>
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
