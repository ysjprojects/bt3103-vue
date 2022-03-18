<template>
  <!-- eslint-disable -->
  <div>
    <b-form @submit.stop.prevent>
      <label for="feedback-user">Old Password</label>
      <b-form-input
        :state="oldValidation"
        v-model="oldPassword"
        id="feedback-user"
        type="password"
      >
      </b-form-input>
      <b-form-invalid-feedback :state="oldValidation">
        Old password does not match
      </b-form-invalid-feedback>
      <br />
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
      <b-button v-on:click="changePW" v-bind:disabled="!validation"
        >Submit</b-button
      >
    </b-form>
  </div>
</template>

<script>
export default {
  name: "UpdatePW",
  data() {
    return {
      userId: "",
      oldPassword: "",
      newPassword1: "",
      newPassword2: "",
      isDisabled: false,
    };
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
      console.log("you changed your password");
    },
  },
};
</script>
