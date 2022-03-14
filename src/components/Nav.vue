<template>
  <!-- <div class="container-fluid" id="favTable" style="border: solid; padding: 2%">
    <router-link to="/SignIn">SignIn</router-link>
    <router-link to="/SignUp">SignUp</router-link>
    <router-link to="/">Home</router-link>
  </div> -->
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>
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
        <div>
          <b-button id="settings" v-b-modal.modal-center variant="dark">
            <font-awesome-icon icon="fa-solid fa-gear" />
          </b-button>
          <b-modal
            id="settingsMod"
            centered
            title="Welcome!"
            hide-footer="true"
          >
            <SignInPage />
          </b-modal>
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

<style scoped>
#settings {
  float: right;
}
</style>
