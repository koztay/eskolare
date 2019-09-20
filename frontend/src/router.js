import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import CreatePost from "./views/CreatePost.vue";
import Login from "./views/Login.vue";
import Signup from "./views/Signup.vue";
import Account from "@/views/Account";
import ManageCategories from "@/views/ManageCategories";
import ManageAuthors from "@/views/ManageAuthors";
// import ManageBooks from "@/views/ManageBooks"; // this is for staff user
import BookDetail from "@/views/BookDetail"; // this is for both staff and standard user

import store from "./store";

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
  } else {
    next("/login/");
  }
};

const ifSuperUser = (to, from, next) => {
  const profile = store.getters.getProfile;
  if (profile.is_superuser) {
    next();
  } else {
    next("/login/");
  }
};

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about/",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/account/",
      name: "account",
      component: Account,
      beforeEnter: ifAuthenticated
    },
    {
      path: "/create-post/",
      name: "create-post",
      component: CreatePost,
      beforeEnter: ifAuthenticated
    },
    {
      path: "/login/",
      name: "login",
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: "/signup/",
      name: "signup",
      component: Signup,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: "/manage-categories/",
      name: "manage-categories",
      component: ManageCategories,
      beforeEnter: ifSuperUser
    },
    {
      path: "/manage-authors/",
      name: "manage-authors",
      component: ManageAuthors,
      beforeEnter: ifSuperUser
    },
    // {
    //   path: "/manage-books/",
    //   name: "manage-books",
    //   component: ManageBooks,
    //   beforeEnter: ifSuperUser
    // },
    {
      path: "/books/:id",
      name: "book-detail",
      component: BookDetail
    }
  ]
});
