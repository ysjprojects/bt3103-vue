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
export default {
  name: "Profile",
  props: {
    username: String,
    email: String,
  },

  methods: {
    logOut: async function () {
      console.log("you logged out");
    },
  },
};
</script>
