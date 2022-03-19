<template>
  <b-card class="w-100">
    <b-media>
      <template #aside>
        <b-avatar variant="secondary" size="6rem"></b-avatar>
      </template>
      <h3 class="mt-2 ml-3">{{ username }} | {{ email }}</h3>
      <b-button class="ml-3" variant="info" v-on:click="logOut"
        >log out</b-button
      >
    </b-media>
  </b-card>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: "Profile",
  props: {
    username: String,
    email: String,
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
      this.$router.push({ name: "Home" });
      console.log("you logged out");
    },
  },
};
</script>
