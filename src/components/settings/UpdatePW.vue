<template>
  <!-- eslint-disable -->
  <div>
    <b-form @submit.stop.prevent>
      <label for="feedback-user">Old Password</label>
      <b-row>
        <b-col>
        <b-form-input
          v-model="oldPassword"
          id="feedback-user"
          type="password"
        >
        </b-form-input>
        </b-col>
        <b-col v-show="!reauthenticated">
          <b-button @click="reauth()" v-bind:disabled="!oldValidation"
            >Submit</b-button
          >
        </b-col>
      </b-row>
      <br />
      <div v-show="reauthenticated">
        <label for="feedback-user">New Password</label>
        <b-form-input v-model="newPassword1" id="feedback-user" type="password">
        </b-form-input>
        <br />
        <label for="feedback-user">Confirm New Password</label>
        <b-form-input
          v-model="newPassword2"
          :state="newValidation"
          id="feedback-user"
          type="password"
        >
        </b-form-input>
        <b-form-invalid-feedback :state="newValidation">
          Passwords must match
        </b-form-invalid-feedback>

        <div class="mt-3"></div>
        <b-button @click="changePW" v-bind:disabled="!validation"
          >Submit</b-button
        >
      </div>
    </b-form>
  </div>
</template>

<script>
import {
  getAuth,
  onAuthStateChanged,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

export default {
  name: "UpdatePW",
  data() {
    return {
      userId: "",
      oldPassword: "",
      newPassword1: "",
      newPassword2: "",
      isDisabled: false,
      user: false,
      reauthenticated: false,
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
  computed: {
    // prettier-ignore
    newValidation() {
      let isValid = this.newPassword1 == this.newPassword2 && this.newPassword1.length > 0;
      return isValid;
    },
    oldValidation() {
      return this.oldPassword.length > 0;
    },
    validation() {
      return this.newValidation && this.oldValidation;
    },
  },
  methods: {
    changePW: async function () {
      updatePassword(this.user, this.newPassword1)
        .then(() => {
          alert("Password Updated");
          window.location.reload();
        })
        .catch((error) => {
          console.log("Password failed to update");
        });
    },
    reauth: function () {
      const credential = EmailAuthProvider.credential(
        this.user.email,
        this.oldPassword
      );
      reauthenticateWithCredential(this.user, credential)
        .then(() => {
          console.log("reauthenticate successful");
          this.reauthenticated = true;
        })
        .catch((error) => {
          alert("Incorrect Password");
        });
    },
  },
};
</script>
