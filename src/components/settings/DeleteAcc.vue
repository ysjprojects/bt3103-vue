<template>
  <div>
    <p class="text-danger font-weight-bold">
      This is an irreversible action. Do you want to proceed?
    </p>
    <b-form-checkbox
      id="checkbox-1"
      v-model="status"
      name="checkbox-1"
      value="accepted"
      unchecked-value="not_accepted"
    >
      yes, I want to delete my account
    </b-form-checkbox>
    <br />

    <div>
      <b-button
        v-if="status === 'accepted'"
        variant="danger"
        v-on:click="deleteAcc"
      >
        delete my account
      </b-button>
      <!-- State: <strong>{{ status }}</strong> -->
    </div>
  </div>
</template>
<script>
import { getAuth, onAuthStateChanged, deleteUser, reauthenticateWithCredential } from "firebase/auth";

export default {
  name: "DeleteAcc",
  data() {
    return {
      status: "not_accepted",
      user: false,
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

  methods: {
    deleteAcc: async function () {
      console.log(this.user);
      deleteUser(this.user)
        .then(() => {
          console.log("you deleted your account");
          alert("you deleted your account");
          window.location.href = "/";
        })
        .catch((error) => {
          alert("You failed to delete your account");
          console.log("you failed to delete your account");
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
          console.log("incorrect password");
          alert("Incorrect Password");
        });
    },

  },
};
</script>
