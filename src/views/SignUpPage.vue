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
    </div>
    <div class="form-group form-check">
      <p v-show="name" id="nameHelp" class="form-text text-muted">
        {{ error1 }}
      </p>
    </div>
    <div class="form-group">
      <label for="inputPassword1">Password</label>
      <input
        v-model="password1"
        type="password"
        class="form-control"
        id="inputPassword1"
        placeholder="Enter your Password"
      />
    </div>
    <div class="form-group form-check">
      <p v-show="pMatch" id="p1Help" class="form-text text-muted">
        {{ error2 }}
      </p>
    </div>
    <div class="form-group">
      <label for="inputPassword2">Re-enter your Password</label>
      <input
        v-model="password2"
        type="password"
        class="form-control"
        id="inputPassword2"
        placeholder="Enter your Password"
      />
    </div>
    <div class="form-group form-check">
      <p v-show="filled" id="p2Help" class="form-text text-muted">
        {{ error3 }}
      </p>
    </div>

    <button
      v-on:click="create()"
      type="submit"
      class="btn btn-primary"
      v-bind:disabled="isDisabled"
    >
      Submit
    </button>
    <h3>THIS IS TO TEST OUT V-MODEL</h3>
    <p>username: {{ username }}</p>
    <p>password1: {{ password1 }}</p>
    <p>password2: {{ password2 }}</p>
  </form>
</template>

<script>
// FIREBASE TO BE RESOLVED
// import { db } from "../firebase.ts";
// import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import firebaseApp from "../firebase.ts";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);
export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      password1: "",
      password2: "",
      isDisabled: true,
      error1: "Username must be at least 6 characters long",
      error2: "Passwords must match!",
      error3: "form incomplete",
      name: false,
      pMatch: false,
      filled: false,
    };
  },

  methods: {
    create: async function () {
      db.collection("Users").add({
        username: this.username,
        password: this.password1,
      });
    },
    passwordEqual() {
      return this.password1 == this.password2;
    },
    enable() {
      this.isDisabled = true;
      this.name = false;
      this.pMatch = false;
      this.filled = false;
    },
  },

  watch: {
    password1(val) {
      if (val.length == 0) {
        console.log("form incomplete");
        this.isDisabled = true;
      } else if (!this.passwordEqual()) {
        console.log("not equal");
        this.pMatch = true;
        this.isDisabled = true;
      } else {
        this.enable();
      }
    },
    password2(val) {
      if (val.length == 0) {
        this.error = "form incomplete";
        this.isDisabled = true;
      } else if (!this.passwordEqual()) {
        console.log("not equal");
        this.pMatch = true;
        this.isDisabled = true;
      } else {
        this.enable();
      }
    },
    username(val) {
      if (val.length == 0) {
        console.log("form incomplete");
        this.filled = true;
        this.isDisabled = true;
      } else if (val.length < 6) {
        console.log("Username must be at least 6 characters long");
        this.name = true;
        this.isDisabled = true;
      } else {
        this.enable();
      }
    },
  },
};
</script>

<style>
p {
  color: brown;
}
</style>
