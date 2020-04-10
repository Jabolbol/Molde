import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios)
Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)

axios.defaults.baseURL = 'http://localhost:9000/molde/api/v1/'

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  },
  render: h => h(App)
}).$mount('#app');
