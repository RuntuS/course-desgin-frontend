import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "./request/request"
import qs from "qs"
import element from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

Vue.use(element);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
