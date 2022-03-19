<template>
  <b-container class="pt-5 pb-5" style="padding-top: 50px">
    <b-row class="m-1">
      <Profile :username="user.displayName" :email="user.email" />
    </b-row>
    <br />
    <!-- prettier.ignore -->
    <div v-show="user.providerData[0].providerId === 'password'">
      <b-row class="m-1 d-block">
        <h3>Change Password</h3>
        <hr />
      </b-row>
      <b-row class="m-1 d-block">
        <b-button class="ml-3" v-b-toggle.collapse-1 variant="primary"
          >Change my password</b-button
        >
        <b-collapse id="collapse-1" class="mt-3">
          <UpdatePW />
        </b-collapse>
      </b-row>
    </div>

    <b-row class="mt-5"> </b-row>

    <b-row class="d-block m-1">
      <h3 class="text-danger">Delete Account</h3>
      <hr />
    </b-row>

    <b-row class="m-1">
      <DeleteAcc />
    </b-row>

    <b-row>
      <div>
        <!-- Using value -->

        <b-collapse id="collapse-2">
          <b-card></b-card>
        </b-collapse>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import UpdatePW from "@/components/settings/UpdatePW.vue";
import DeleteAcc from "@/components/settings/DeleteAcc.vue";
import Profile from "@/components/settings/Profile.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "Settings",
  components: {
    Profile,
    UpdatePW,
    DeleteAcc,
  },
  data() {
    return {
      user: false,
      email: "email",
      visible: true,
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
};
</script>
