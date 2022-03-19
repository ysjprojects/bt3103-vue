<template>
  <div id="firebaseui-auth-container" style="min-width: 250px"></div>

  <!-- <form>
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
      <small class="create">
        Not a user yet? Click
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
  </form> -->
</template>

<script>
import firebase from "@/uifire.ts";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
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
  mounted() {
    //calling the ui instance
    var ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      //we need to create the instance only one time
      //initialize the FirebaseUI widget using firebase
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }

    var uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    };
    ui.start("#firebaseui-auth-container", uiConfig);
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
