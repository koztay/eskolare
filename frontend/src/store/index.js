/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import auth from './modules/auth';
import categories from './modules/categories';
import authors from './modules/authors';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    user,
    auth,
    categories,
    authors
  },
  strict: debug
});
