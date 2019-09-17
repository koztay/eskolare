import apiCall from "../utils/api";
import store from "../store";

export default {
  getCategories() {
    store.commit("startLoading");
    const url = `/api/categories/`;

    return apiCall
      .get(url)
      .then(response => {
        const data = response.data;
        console.log("categories ney ? =>", JSON.stringify(data));
        store.commit("setCategories", data);
      })
      .catch(error => {
        console.log("Error => ", error, "Data => ", error.response.data);
      })
      .finally(() => {
        store.commit("stopLoading");
      });
  }
};
