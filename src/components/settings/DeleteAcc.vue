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
import { getAuth, onAuthStateChanged, deleteUser } from "firebase/auth";

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
      deleteUser(this.user.uid)
        .then(() => {
          console.log("you deleted your account");
          alert("you deleted your account");
          // this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          alert("You failed to delete your account");
          console.log("you failed to delete your account");
        });
    },
  },
};
</script>
