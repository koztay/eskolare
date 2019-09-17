/// This helper is created to fetch the users location when application
/// resumed

import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums"; // used to describe at what accuracy the location should be get

import moment from "moment";

import store from "../store";

const fetchMyLocation = () => {
  console.log("getCurrentLocation çalıştı");
  geolocation
    .getCurrentLocation({
      desiredAccuracy: Accuracy.high,
      maximumAge: 1000,
      timeout: 20000
    })
    .then(res => {
      console.log("location 'ı set etmiş olması lazım");
      // this.origin.latitude = res.latitude;
      // this.origin.longitude = res.longitude;
      let location = { lat: res.latitude, lng: res.longitude };
      // this.$store.dispatch('updateLocation', location);
      // action mı ateşlemek lazım direkt commit mi etmek lazım anlamadım...
      store.commit("setLocation", location);
      // sonrasında eventleri de çekebilmemiz lazım
      const startOfMonth = moment()
        .startOf("month")
        .format("YYYY-MM-DD");
      const endOfMonth = moment()
        .endOf("month")
        .format("YYYY-MM-DD");
      store.dispatch("fetchEvents", {
        start: startOfMonth,
        end: endOfMonth
      });
    })
    .catch(e => {
      console.log("oh frak, error", e);
    });
};

export default fetchMyLocation;
