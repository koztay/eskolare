// import Vue from 'vue';
// import vuetify from './plugins/vuetify';
// import Vuelidate from 'vuelidate';

// import App from './App.vue';
// import router from './router';
// import store from './store';

// Vue.config.productionTip = false;

// Vue.use(Vuelidate);

// new Vue({
//   // mixins: [validationMixin],
//   router,
//   store,
//   vuetify,
//   render: h => h(App)
// }).$mount('#app');

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
