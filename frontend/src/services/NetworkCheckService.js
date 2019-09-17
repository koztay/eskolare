import Vue from "nativescript-vue";
import {
  connectionType,
  getConnectionType
} from "tns-core-modules/connectivity";
import routes from "../router";

const checkNetwork = () => {
  if (getConnectionType() == connectionType.none) {
    Vue.prototype.$navigateTo(routes.noNetwork);
    // Vue.prototype.$showModal(Detail);
  }
};

export default checkNetwork;
