import checkNetwork from "./NetworkCheckService";
import apiCall from "../services/api";
import store from "../store";
import { BASE_URL, backendService } from "../main";

export default {
  getTags() {
    checkNetwork();
    store.commit("startLoading");
    // const url = `${BASE_URL}/tr/api/v1/activities/tags/`;
    const url = `${BASE_URL}/api/v1/activities/tags/`;
    apiCall
      .get(url)
      .then(response => {
        const data = response.data;
        //   console.log(`Gelen data : ${data}`);
        // data.forEach(element => {
        //   console.log(element.display_name);
        // });
        store.commit("setTags", data);
        // console.log(`Mevcut publisher sayısı : ${data.length}`);
      })
      .catch(error => {
        console.log("Error => ", error, "Data => ", error.response.data);
      })
      .finally(() => {
        console.log("Tagservice finally bloğu çalışıyor...");
        store.commit("stopLoading");
      });
    return apiCall; // return original Promise
    // bunu promise olarak döndürüyoruz, ki activitiy indicator gösterebilelim.
  },

  toggleFollowingTag(tagSlug) {
    // const encodedUserName = encodeURI(userName); // Türkçe karakter içerdiği için encode ediyoruz.
    // /api/v1/activities/toggle_follow/tag/blockchain/
    // const url = `${BASE_URL}/tr/api/v1/activities/toggle_follow/tag/${tagSlug}`;
    const url = `${BASE_URL}/api/v1/activities/toggle_follow/tag/${tagSlug}/`;

    apiCall
      .get(url)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }
};
