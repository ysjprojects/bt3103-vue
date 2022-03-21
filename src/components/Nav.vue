<template>
  <!-- <div class="container-fluid" id="favTable" style="border: solid; padding: 2%">
    <router-link to="/SignIn">SignIn</router-link>
    <router-link to="/SignUp">SignUp</router-link>
    <router-link to="/">Home</router-link>
  </div> -->
  <div>
    <b-navbar toggleable="lg" class="fixed-top" type="dark" variant="dark">
      <b-navbar-brand href="#">Carparks</b-navbar-brand>
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/" v-show="!atHome"> Home</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item href="#favTable" v-show="atHome">Favourites</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item href="#searchOptions" v-show="atHome">Search</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item href="#resultsTop" v-show="atHome">Results</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <div>
            <b-nav-item-dropdown text="Log-in" v-if="!user" right>
              <SignInPage />
            </b-nav-item-dropdown>
            <b-button @click="logOut" v-else variant="dark">Log-Out</b-button>
          </div>
          <div>
            <b-button href="/settings" variant="dark" v-if="user">
              <font-awesome-icon icon="fa-solid fa-gear"
            /></b-button>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import SignInPage from "@/components/SignInPage.vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: "Home",
  components: {
    SignInPage,
  },
  data() {
    return {
      user: false,
    };
  },
  mounted() {
    const auth = getAuth();
    //made use of lambda
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  methods: {
    logOut: function () {
      const auth = getAuth();
      const user = auth.currentUser;
      signOut(auth, user);
      window.location.href = "/";
      console.log("you logged out");
    },
  },
  computed: {
    atHome () {
      return (window.location.pathname=="/")
    }
  }
};
</script>
