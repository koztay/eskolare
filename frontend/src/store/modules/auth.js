import JwtDecode from "jwt-decode";

import {
  AUTH_REQUEST,
  SIGNUP_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from "../actions/auth";
import { USER_REQUEST } from "../actions/user";
import apiCall from "../../utils/api.js";

const state = {
  token: localStorage.getItem("user-token") || "",
  status: "",
  hasLoadedOnce: false,
  badLogin: false
};

const getters = {
  getToken: state => state.token,
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  badLogin: state => state.badLogin
};

const actions = {
  setLogoutTimer({ dispatch }, expirationTime) {
    // bu action kullanıcı login veya signup yapınca ateşlenir ve token expire olmadan
    // 10 saniye önce refreshToken action 'ını çalıştırır.

    // refresh etmeden önce mevcut token 'ı almalıyız.
    // const token = localStorage.getItem('user-token');

    // şu an ile expire olacak zaman arasındaki süreyi ve 10 saniye öncesini buluyoruz.
    const now = new Date();
    const duration = expirationTime - now - 10000;
    // bu fonksiyon token expire olmadan 10 saniye öncesinde refreshToken action 'ı ateşler.
    setTimeout(() => {
      const token = state.token;
      if (token) {
        dispatch("refreshToken");
      }
    }, duration); //10 saniye tolorans koydum expire olmadan çalışması lazım.
  },
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    // bu action ile backend 'den kullanıcı adı ve şifremiz ile JWT token alıyoruz.
    // kullanıcı formu doldurup login butonuna basınca bu action ateşleniyor.
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      apiCall
        .post("/api/auth/obtain_token/", user)
        .then(resp => {
          // token 'ı storage 'a yazıyoruz.
          localStorage.setItem("user-token", resp.data.token);
          const expirationDate = new Date(
            JwtDecode(resp.data.token).exp * 1000
          );
          // token expire süresini storage 'a yazıyoruz.
          localStorage.setItem("expirationDate", expirationDate);
          commit(AUTH_SUCCESS, resp);
          dispatch(USER_REQUEST);
          // login olunca timer 'ı çalıştırmamız lazım ki sürekli refresh etsin token'ı
          // dispatch("setLogoutTimer", expirationDate);
          resolve(resp);
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          commit(AUTH_LOGOUT); // eğer herhangi bir şekilde AUTH_REQUEST hata vermişse AUTH_LOGOUT yap.
          reject(err);
        });
    });
  },
  [SIGNUP_REQUEST]: ({ commit, dispatch }, user) => {
    // bu action ile kullanıcıyı siteye kayıt ediyoruz.
    // kullanıcı formu doldurup kayıt ol butonuna basınca bu action ateşleniyor.
    return new Promise((resolve, reject) => {
      // commit(SIGNUP_REQUEST);
      apiCall
        .post("/api/rest-auth/registration/", user)
        .then(resp => {
          // token 'ı storage 'a yazıyoruz.
          localStorage.setItem("user-token", resp.data.token);
          const expirationDate = new Date(
            JwtDecode(resp.data.token).exp * 1000
          );
          // token expire süresini storage 'a yazıyoruz.
          localStorage.setItem("expirationDate", expirationDate);
          commit(AUTH_SUCCESS, resp);
          dispatch(USER_REQUEST);
          // login olunca timer 'ı çalıştırmamız lazım ki sürekli refresh etsin token'ı
          // dispatch("setLogoutTimer", expirationDate);
          resolve(resp);
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          localStorage.removeItem("user-token");
          reject(err);
        });
    });
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    commit(AUTH_LOGOUT);
  },
  tryAutoLogin({ dispatch, commit }) {
    const token = state.token;

    if (!token) {
      commit(AUTH_LOGOUT);
      return;
    }
    const expirationDate = localStorage.getItem("expirationDate");
    const now = new Date();
    const expirationAsDateObj = new Date(expirationDate); // karşılaştırmak için Date object 'e çevirmen lazım...
    if (now >= expirationAsDateObj) {
      commit(AUTH_LOGOUT);
      return;
    }
    // const userId = localStorage.getItem('userId');
    dispatch("refreshToken");
  },
  refreshToken({ commit, dispatch }) {
    // mevcut token ile yeni token alan action bu
    const token = state.token;
    if (token) {
      return new Promise((resolve, reject) => {
        apiCall
          .post("/api/auth/refresh_token/", { token: token })
          .then(resp => {
            // token 'ı storage 'a yazıyoruz.
            localStorage.setItem("user-token", resp.data.token);
            const expirationDate = new Date(
              JwtDecode(resp.data.token).exp * 1000
            );
            // token expire süresini storage 'a yazıyoruz.
            localStorage.setItem("expirationDate", expirationDate);
            commit(AUTH_SUCCESS, resp);
            dispatch(USER_REQUEST);
            // dispatch("setLogoutTimer", expirationDate); // bu sayede sürekli refresh olur.
            resolve(resp);
          })
          .catch(err => {
            commit(AUTH_ERROR, err);
            localStorage.removeItem("user-token");
            console.log(err.response);
            reject(err);
          });
      });
    }
  }
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = "success";
    state.token = resp.data.token;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: state => {
    state.badLogin = "true";
    state.status = "error";
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT]: state => {
    localStorage.removeItem("user-token");
    state.token = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
