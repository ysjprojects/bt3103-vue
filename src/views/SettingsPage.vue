<template>
  <b-container class="pt-5 pb-5">
    <b-row class="m-1">
      <Profile :username="username" :email="email" />
    </b-row>
    <br />
    <!-- prettier.ignore -->
    <b-row class="m-1 d-block">
      <h3>Change Password</h3>
      <hr />
    </b-row>

    <b-row class="m-1">
      <UpdatePW />
    </b-row>

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
export default {
  name: "Settings",
  components: {
    Profile,
    UpdatePW,
    DeleteAcc,
  },
  data() {
    return {
      username: "username",
      email: "email",
      visible: true,
    };
  },
};
</script>
