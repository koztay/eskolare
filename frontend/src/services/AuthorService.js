import apiCall from "../utils/api";
import store from "../store";

export default {
  getAuthors() {
    // store.commit("startLoading");
    const url = `/api/authors/`;

    return apiCall
      .get(url)
      .then(response => {
        const data = response.data;
        store.commit("setAuthors", data);
      })
      .catch(error => {
        console.log("Error => ", error, "Data => ", error.response.data);
      })
      .finally(() => {
        // store.commit("stopLoading");
      });
  },
  addAuthor(data) {
    const url = `/api/authors/`;
    return apiCall
      .post(url, data)
      .then(() => {
        this.getAuthors();
      })
      .catch(error => {
        console.log("Error => ", error, "Data => ", error.response.data);
      })
      .finally(() => {
        // store.commit("stopLoading");
      });
  },
  updateAuthor(data) {
    const url = `/api/authors/${data.id}/`;

    return apiCall
      .patch(url, data)
      .then(() => {
        this.getAuthors();
      })
      .catch(error => {
        console.log("Error => ", error, "Data => ", error.response.data);
      })
      .finally(() => {
        // store.commit("stopLoading");
      });
  },
  deleteAuthor(data) {
    const url = `/api/authors/${data.id}/`;

    return apiCall
      .delete(url, data)
      .then(() => {
        this.getAuthors();
      })
      .catch(error => {
        console.log("Error => ", error, "Data => ", error.response.data);
      })
      .finally(() => {
        // store.commit("stopLoading");
      });
  }
};
