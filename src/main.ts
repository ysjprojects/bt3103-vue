/* eslint-disable */
import router from "./router";
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faRoute, faSquareParking, faTrashCan, fas, faCircleInfo, faUser, faPencil } from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false;

library.add(faRoute, faSquareParking, faTrashCan, fas, faCircleInfo, faUser, faPencil)
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(BootstrapVue);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");