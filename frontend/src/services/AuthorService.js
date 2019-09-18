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
        console.log(JSON.stringify(data));
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
    console.log("data gelmiş mi => ", data);
    const url = `/api/authors/`;
    return apiCall
      .post(url, data)
      .then(res => {
        console.log(res);
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
    console.log("data gelmiş mi => ", data);
    const url = `/api/authors/${data.id}/`;
    console.log("url gelmiş mi => ", url);

    return apiCall
      .patch(url, data)
      .then(res => {
        console.log(res);
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
    console.log("data gelmiş mi => ", data);
    const url = `/api/authors/${data.id}/`;
    console.log("url gelmiş mi => ", url);

    return apiCall
      .delete(url, data)
      .then(res => {
        console.log(res);
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
