import Vue from 'vue';
import './plugins/vuetify';
import Vuelidate from 'vuelidate';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Vuelidate);

new Vue({
  // mixins: [validationMixin],
  router,
  store,
  render: h => h(App)
}).$mount('#app');
