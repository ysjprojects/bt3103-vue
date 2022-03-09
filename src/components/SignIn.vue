<template>
  <form>
    <div class="form-group">
      <label for="usernameInput">Username</label>
      <input
        v-model="username"
        type="text"
        class="form-control"
        id="usernameInput"
        aria-describedby="emailHelp"
        placeholder="Enter your Username"
      />
      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your username or password with anyone else.</small> -->
    </div>
    <div class="form-group">
      <label for="inputPassword">Password</label>
      <input
        v-model="password"
        type="password"
        class="form-control"
        id="inputPassword1"
        placeholder="Enter your Password"
      />
    </div>
    <div class="form-group form-check">
      <!-- <input type="checkbox" class="form-check-input" id="exampleCheck1"> -->
      <!-- <label class="form-check-label" for="exampleCheck1">Check me out</label> -->
      <small id="userHelp" class="form-text text-muted"
        >Not a user yet? Click here to create an account</small
      >
    </div>
    <button v-on:click="logIn" type="submit" class="btn btn-primary">
      Submit
    </button>
    <h3>THIS IS TO TEST OUT V-MODEL</h3>
    <p>username: {{ username }}</p>
    <p>password: {{ password }}</p>
  </form>
</template>

<script>
import { db } from "../firebase.ts";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

export default {
  name: "SignIn",
  data() {
    return {
      username: "",
      password: "",
    };
  },

  methods: {
    logIn: async function () {
      let z = await getDocs(collection(db, "Users"));
      window.alert("trying to log in");
    },
  },
};
</script>

<style>
</style>


