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
    const url = `/api/categories/`;
    return apiCall
      .post(url, data)
      .then(() => {
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
    const url = `/api/categories/${data.id}/`;

    return apiCall
      .patch(url, data)
      .then(() => {
        this.getCategories();
      })
      .catch(error => {
        console.log("Error => ", error, "Data => ", error.response.data);
      })
      .finally(() => {
        // store.commit("stopLoading");
      });
  },
  deleteCategory(data) {
    const url = `/api/categories/${data.id}/`;

    return apiCall
      .delete(url, data)
      .then(() => {
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
