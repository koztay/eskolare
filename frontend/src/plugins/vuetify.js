import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  iconfont: 'fa',
  theme: {
    primary: '#009688',
    // secondary: '#00bcd4',
    secondary: '#35495E',
    accent: '#e91e63',
    error: '#f44336',
    warning: '#ffc107',
    info: '#607d8b',
    success: '#4caf50'
  }
});
