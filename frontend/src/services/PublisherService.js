import checkNetwork from "./NetworkCheckService";
import apiCall from "../services/api";
import store from "../store";
import { BASE_URL } from "../main";

export default {
  getPublishers() {
    checkNetwork();
    store.commit("startLoading");
    const url = `${BASE_URL}/tr/api/v1/events/publishers/`;
    // const url = `http://127.0.0.1:8000/tr/api/v1/events/calendar/?start=${startDate}&end=${endDate}`;
    // apiCall kullanmazsak login olmuş user'ı bulamadığı için takip edilen publisherları da bulamıyor.
    return apiCall
      .get(url)
      .then(response => {
        const data = response.data;
        //   console.log(`Gelen data : ${data}`);
        // data.forEach(element => {
        //   console.log(element.display_name);
        // });
        store.commit("setPublishers", data);
        // console.log(`Mevcut publisher sayısı : ${data.length}`);
      })
      .catch(error => {
        console.log("Error => ", error, "Data => ", error.response.data);
      })
      .finally(() => {
        store.commit("stopLoading");
      });
    // return apiCall; // bunu promise olarak döndürüyoruz, ki activitiy indicator gösterebilelim.
  },
  toggleFollowing(userName) {
    const encodedUserName = encodeURI(userName); // Türkçe karakter içerdiği için encode ediyoruz.
    // console.log('Following Url geliyor mu? :', followingURL);
    const url = `${BASE_URL}/api/users/${encodedUserName}/follow/`;

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
