import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import CreatePost from './views/CreatePost.vue';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import Account from '@/views/Account';

import store from './store';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
  } else {
    next('/login/');
  }
};

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about/',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/account/',
      name: 'account',
      component: Account,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/create-post/',
      name: 'create-post',
      component: CreatePost,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/login/',
      name: 'login',
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/signup/',
      name: 'signup',
      component: Signup,
      beforeEnter: ifNotAuthenticated
    }
  ]
});
