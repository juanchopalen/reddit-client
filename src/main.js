import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'

Vue.config.productionTip = false

Vue.use(require('vue-moment'))

window.moment = require('moment');


new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
