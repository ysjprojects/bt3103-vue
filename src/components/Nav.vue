<template>
  <!-- <div class="container-fluid" id="favTable" style="border: solid; padding: 2%">
    <router-link to="/SignIn">SignIn</router-link>
    <router-link to="/SignUp">SignUp</router-link>
    <router-link to="/">Home</router-link>
  </div> -->
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>

        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item class="link" href="/SignIn">
            <center>Sign in</center>
          </b-dropdown-item>
          <b-dropdown-item class="link" href="/SignUp">
            <center>Sign up</center>
          </b-dropdown-item>
          <!-- <b-dropdown-item href="/SignUp">Sign Up</b-dropdown-item> -->
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Nav",
};
</script>
