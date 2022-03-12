<template>
  <form>
    <div class="form-group">
      <label for="usernameInput">Username</label>
      <input
        v-model.lazy="username"
        type="text"
        class="form-control"
        id="usernameInput"
        aria-describedby="emailHelp"
        placeholder="Enter your Username"
        required="true"
      />
    </div>
    <div class="form-group form-check">
      <small v-show="name" id="nameHelp" class="form-text-text-muted">
        {{ error1 }}
      </small>
    </div>
    <div class="form-group">
      <label for="inputPassword1">Password</label>
      <input
        v-model.lazy="password1"
        type="password"
        class="form-control"
        id="inputPassword1"
        placeholder="Enter your Password"
        required="true"
      />
    </div>
    <div class="form-group">
      <label for="inputPassword2">Re-enter your Password</label>
      <input
        v-model.lazy="password2"
        type="password"
        class="form-control"
        id="inputPassword2"
        placeholder="Enter your Password"
        required="true"
      />
    </div>
    <div class="form-group form-check">
      <!-- <input type="checkbox" class="form-check-input" id="exampleCheck1"> -->
      <!-- <label class="form-check-label" for="exampleCheck1">Check me out</label> -->
      <!-- <small id="userHelp" class="form-text text-muted"
        >Not a user yet? Click here to create an account</small
      > -->
      <small class="create">
        Already a user? Click
        <!-- <a :href="$router.resolve({name: 'SignUp'}).href">link</a> -->
        <!-- <router-link v-on:click="closeModal" to="/SignUp">here</router-link> -->
        <a href="/signin" class="link-primary">here</a>
        to sign in!
      </small>
    </div>
    <div class="form-group form-check">
      <small v-show="pMatch" id="p1Help" class="form-text-text-muted">
        {{ error2 }}
      </small>
    </div>
    <div class="form-group form-check">
      <small v-show="filled" id="p2Help" class="form-text-text-muted">
        {{ error3 }}
      </small>
    </div>

    <button
      v-on:click="create()"
      type="submit"
      class="btn btn-primary"
      v-bind:disabled="isDisabled"
    >
      Submit
    </button>
    <!-- <h3>THIS IS TO TEST OUT V-MODEL</h3>
    <p>username: {{ username }}</p>
    <p>password1: {{ password1 }}</p>
    <p>password2: {{ password2 }}</p> -->
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
      error3: "All entries must be fully filled",
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
      this.isDisabled = false;
    },
    disable() {
      this.isDisabled = true;
    },
    // prettier-ignore
    isfilled() {
      return this.password1.length != 0 && this. password2.length != 0 && this.username.length != 0;
    },
    checkPW() {
      if (!this.passwordEqual()) {
        this.pMatch = true;
      } else {
        this.pMatch = false;
      }
    },
    checkFilled() {
      if (!this.isfilled()) {
        this.filled = true;
      } else {
        this.filled = false;
      }
    },
    checkName() {
      if (this.username.length < 6) {
        this.name = true;
      } else {
        this.name = false;
      }
    },
    okay() {
      return !(this.name || this.filled || this.pMatch);
    },
  },
  watch: {
    password1(val) {
      this.checkPW();
      this.checkFilled();
      this.checkName();
      if (this.okay()) {
        this.enable();
      } else {
        this.disable();
      }
    },
    password2(val) {
      this.checkPW();
      this.checkFilled();
      this.checkName();
      if (this.okay()) {
        this.enable();
      } else {
        this.disable();
      }
    },
    username(val) {
      this.checkPW();
      this.checkFilled();
      this.checkName();
      if (this.okay()) {
        this.enable();
      } else {
        this.disable();
      }
    },
  },
};
</script>

<style scoped>
.form-text-text-muted {
  color: red;
}
form {
  padding: 10px;
}
input {
  max-width: 800px;
}
</style>
