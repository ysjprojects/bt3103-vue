<template>
  <div class="mb-2">
    <b-row align-v="center">
      <b-col>
        <b-avatar variant="secondary" size="6rem"></b-avatar>
      </b-col>
      <b-col>
        <b-row>
          <h3 class="align-self-center mr-4">{{ username }}</h3>
        </b-row>
        <b-row>
          <b-button variant="info" v-on:click="logOut">log out</b-button>
        </b-row>
      </b-col>
    </b-row>
    <br />
    <!-- prettier.ignore -->
    <b-row>
      <div>
        <!-- Using modifiers -->
        <b-button v-b-toggle.collapse-1 variant="primary" class="m-1">
          Change Password
        </b-button>
        <!-- Element to collapse -->
        <b-collapse id="collapse-1">
          <b-card><UpdatePW /></b-card>
        </b-collapse>
      </div>
    </b-row>
    <b-row>
      <div>
        <!-- Using value -->
        <b-button v-b-toggle="'collapse-2'" variant="danger" class="m-1">
          Danger!
        </b-button>
        <b-collapse id="collapse-2">
          <b-card><DeleteAcc /></b-card>
        </b-collapse>
      </div>
    </b-row>
  </div>
</template>

<script>
import UpdatePW from "@/components/UpdatePW.vue";
import DeleteAcc from "@/components/DeleteAcc.vue";

export default {
  name: "Settings",
  components: {
    UpdatePW,
    DeleteAcc,
  },
  data() {
    return {
      username: "username",
      visible: true,
    };
  },
  methods: {
    logOut: async function () {
      console.log("you logged out");
    },
  },
};
</script>
