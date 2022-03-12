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
      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your username or password with anyone else.</small> -->
    </div>
    <div class="form-group">
      <label for="inputPassword">Password</label>
      <input
        v-model.lazy="password"
        type="password"
        class="form-control"
        id="inputPassword1"
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
        Not a user yet? Click
        <!-- <a :href="$router.resolve({name: 'SignUp'}).href">link</a> -->
        <!-- <router-link v-on:click="closeModal" to="/SignUp">here</router-link> -->
        <a href="/SignUp" class="link-primary">here</a>
        to create an account today!
      </small>
    </div>
    <div class="form-group form-check">
      <small v-show="notFilled" id="nameHelp" class="form-text-text-muted">
        {{ error3 }}
      </small>
    </div>
    <button type="submit" class="btn btn-primary" v-bind:disabled="isDisabled">
      Login
    </button>
    <!-- <h3>THIS IS TO TEST OUT V-MODEL</h3>
    <p>username: {{ username }}</p>
    <p>password: {{ password }}</p> -->
  </form>
</template>

<script>
import { db } from "../firebase.ts";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
// import Nav from "@/components/Nav.vue";

// @Component({
//     components: {
//         Nav,
//     },
// })

export default {
  name: "SignInPage",
  data() {
    return {
      username: "",
      password: "",
      error3: "All entries have to be filled!",
      notFilled: false,
      isDisabled: true,
    };
  },

  methods: {
    logIn: async function () {
      let z = await getDocs(collection(db, "Users"));
      window.alert("trying to log in");
    },
    enable() {
      this.isDisabled = false;
    },
    disable() {
      this.isDisabled = true;
    },
    isFilled() {
      return this.username.length != 0 && this.password.length != 0;
    },
    checkFilled() {
      if (!this.isFilled()) {
        this.notFilled = true;
      } else {
        this.notFilled = false;
      }
    },
    okay() {
      //more conditions to be added once firebase is set up
      return !this.notFilled;
    },
  },
  watch: {
    password(val) {
      this.checkFilled();
      if (this.okay()) {
        this.enable();
      } else {
        this.disable();
      }
    },
    username(val) {
      this.checkFilled();
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
