import apiCall from "../utils/api";
import store from "../store";

export default {
  getCategories() {
    // store.commit("startLoading");
    const url = `/api/categories/`;

    return apiCall
      .get(url)
      .then(response => {
        const data = response.data;
        console.log(JSON.stringify(data));
        store.commit("setCategories", data);
      })
      .catch(error => {
        console.log("Error => ", error, "Data => ", error.response.data);
      })
      .finally(() => {
        // store.commit("stopLoading");
      });
  },
  addCategory(data) {
    console.log("data gelmiş mi => ", data);
    const url = `/api/categories/`;
    return apiCall
      .post(url, data)
      .then(res => {
        console.log(res);
        this.getCategories();
      })
      .catch(error => {
        console.log("Error => ", error, "Data => ", error.response.data);
      })
      .finally(() => {
        // store.commit("stopLoading");
      });
  },
  updateCategory(data) {
    console.log("data gelmiş mi => ", data);
    const url = `/api/categories/${data.id}/`;
    console.log("url gelmiş mi => ", url);

    return apiCall
      .patch(url, data)
      .then(res => {
        console.log(res);
        this.getCategories();
      })
      .catch(error => {
        console.log("Error => ", error, "Data => ", error.response.data);
      })
      .finally(() => {
        // store.commit("stopLoading");
      });
  }
};
