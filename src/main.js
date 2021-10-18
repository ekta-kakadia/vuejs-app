import Vue from "vue";
import App from "./App.vue";
import vuetify from "vuetify";
import { store } from "./store";
import router from "./router";
import "vuetify/dist/vuetify.min.css";
import axios from "axios";
import Toasted from "vue-toasted";

Vue.prototype.$http = axios;
import AppLayout from "./layouts/AppLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";

Vue.component("AuthLayout", AuthLayout);
Vue.component("AppLayout", AppLayout);
Vue.use(vuetify);
Vue.config.productionTip = false;
Vue.use(Toasted);

const opts = {
  theme: {
    light: true,
  },
};
new Vue({
  vuetify: new vuetify(opts),
  router,
  store,
  components: { App },
  render: (h) => h(App),
}).$mount("#app");
