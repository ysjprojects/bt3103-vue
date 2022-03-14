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
        v-on:click="deleteUser"
      >
        delete my account
      </b-button>
      <!-- State: <strong>{{ status }}</strong> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "DeleteAcc",
  data() {
    return {
      status: "not_accepted",
    };
  },
  methods: {
    deleteUser: async function () {
      console.log("you deleted your account");
    },
  },
};
</script>
