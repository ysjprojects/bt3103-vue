import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import SignInPage from "../views/SignInPage.vue";
// import SignIn from "../views/SignIn.vue";
// import SignUp from "../views/SignUp.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/signin",
    name: "SignInPage",
    component: SignInPage,
  },
  // {
  //   path: "/SignIn",
  //   name: "SignIn",
  //   component: SignIn,
  // },
  // {
  //   path: "/SignUp",
  //   name: "SignUp",
  //   component: SignUp,
  // },


];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

