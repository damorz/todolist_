import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/task.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueSweetalert2);
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
