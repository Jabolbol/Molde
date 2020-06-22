import 'core-js/stable';
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import CoreuiVue from '@coreui/vue';
import { iconsSet as icons } from './assets/icons/icons.js';
import store from './store';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);
Vue.use(CoreuiVue);

Vue.config.performance = true;
Vue.prototype.$log = console.log.bind(console);

axios.defaults.baseURL = 'http://localhost:9000/molde/api/v1/';

// If token already available, set is as default header
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = token;
}

// Check if user is authenticated before each route
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (
      localStorage.getItem('token') === null ||
      localStorage.getItem('token') === ''
    ) {
      next('/pages/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App,
  },
  router,
  store,
  icons,
  render: (h) => h(App),
}).$mount('#app');
