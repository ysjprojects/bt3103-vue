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
        <!-- <div>
          <b-nav-item href="/Settings">
            <font-awesome-icon icon="fa-solid fa-gear"
          /></b-nav-item>
        </div> -->
        <div>
          <b-button v-b-toggle.sidebar-right variant="dark">
            <font-awesome-icon icon="fa-solid fa-gear"
          /></b-button>
          <!-- <b-sidebar id="sidebar-right" title="Sidebar" right shadow> -->
          <b-sidebar id="sidebar-right" right shadow>
            <div class="px-3 py-2">
              <Settings />
            </div>
          </b-sidebar>
        </div>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import SignInPage from "@/components/SignInPage.vue";
import Settings from "@/components/Settings.vue";
export default {
  name: "Home",
  components: {
    SignInPage,
    Settings,
  },
};
</script>

<style scoped>
#settings {
  float: right;
}
</style>
