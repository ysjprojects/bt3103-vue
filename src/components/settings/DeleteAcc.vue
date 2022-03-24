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
    <b-form @submit.stop.prevent v-if="status === 'accepted'">
      <div v-if="user.providerData[0].providerId === 'password'">
        <label for="feedback-user">Enter your password:</label>
        <b-row>
          <b-col>
            <b-form-input
              v-model="oldPassword"
              id="feedback-user"
              type="password"
            >
            </b-form-input>
          </b-col>
        </b-row>
        <br>
        <b-row>
          <b-col>
            <b-button
              variant="danger"
              v-on:click="reauthPW"
            >
              delete my account
            </b-button>
          </b-col>
        </b-row>
      </div>
      <div v-else>
        <b-button
          variant="danger"
          v-on:click="reauthGoogle"
        >
          Reauthenticate and delete my account
        </b-button>
      </div>
    </b-form>
  </div>
    <!-- <div>
      <b-button
        v-if="status === 'accepted'"
        variant="danger"
        v-on:click="deleteAcc"
      >
        delete my account
      </b-button>
    </div> -->
</template>
<script>
import { getAuth,
  onAuthStateChanged,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider, 
  reauthenticateWithPopup,
  GoogleAuthProvider, 
} from "firebase/auth";

export default {
  name: "DeleteAcc",
  data() {
    return {
      status: "not_accepted",
      reauthenticated: false,
      user: false,
      oldPassword:"",
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
      deleteUser(this.user)
        .then(() => {
          alert("You deleted your account");
          window.location.href = "/";
        })
        .catch((error) => {
          alert("Password incorrect");
        });
    },
    reauthPW: function () {
      const credential = EmailAuthProvider.credential(
        this.user.email,
        this.oldPassword
      );
      reauthenticateWithCredential(this.user, credential)
        .then(() => {
          this.deleteAcc()
        })
        .catch((error) => {
          alert("Incorrect Password");
        });
    },
    reauthGoogle: function () {
      reauthenticateWithPopup(this.user, new GoogleAuthProvider())
        .then(function(userCredential) {
          // You can now delete the user:
          firebase.auth().currentUser.delete
        })
        .catch(function(error) {
          alert("failed to delete");
          console.log(error)
          // Credential mismatch or some other error.
        });      
    }
  },
};
</script>
