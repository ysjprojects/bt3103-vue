<template>
  <!-- eslint-disable -->
  <div>
    <b-form @submit.stop.prevent>
      <label for="feedback-user">Enter your new Password</label>
      <b-form-input v-model="newPassword1" id="feedback-user" type="password">
      </b-form-input>
      <label for="feedback-user">Re-enter your new Password</label>
      <b-form-input v-model="newPassword2" :state="validation" id="feedback-user" type="password">
      </b-form-input>
      <b-form-invalid-feedback :state="validation">
        Passwords must match
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="validation">
        Looks Good.
      </b-form-valid-feedback>
      <b-button v-on:click="changePW" v-bind:disabled="!validation">Submit</b-button>
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
    validation() {
      let isValid = this.newPassword1 == this.newPassword2 && this.newPassword1.length > 0;
      return isValid;
    },
  },
  methods: {
    changePW: async function () {
      console.log("you changed your password");
    },
  },
};
</script>
