import apiCall from "../utils/api";
import store from "../store";

export default {
  getBooks() {
    // store.commit("startLoading");
    const url = `/api/books/`;

    return apiCall
      .get(url)
      .then(response => {
        const data = response.data;
        console.log(JSON.stringify(data));
        store.commit("setBooks", data);
      })
      .catch(error => {
        console.log("Error => ", error, "Data => ", error.response.data);
      })
      .finally(() => {
        // store.commit("stopLoading");
      });
  },
  addBook(data) {
    console.log("data gelmiş mi => ", data);
    const url = `/api/books/`;
    return apiCall
      .post(url, data)
      .then(res => {
        console.log(res);
        this.getBooks();
      })
      .catch(error => {
        console.log("Error => ", error, "Data => ", error.response.data);
      })
      .finally(() => {
        // store.commit("stopLoading");
      });
  },
  updateBook(data) {
    console.log("data gelmiş mi => ", data);
    const url = `/api/books/${data.id}/`;
    console.log("url gelmiş mi => ", url);

    return apiCall
      .patch(url, data)
      .then(res => {
        console.log(res);
        this.getBooks();
      })
      .catch(error => {
        console.log("Error => ", error, "Data => ", error.response.data);
      })
      .finally(() => {
        // store.commit("stopLoading");
      });
  },
  deleteBook(data) {
    console.log("data gelmiş mi => ", data);
    const url = `/api/books/${data.id}/`;
    console.log("url gelmiş mi => ", url);

    return apiCall
      .delete(url, data)
      .then(res => {
        console.log(res);
        this.getBooks();
      })
      .catch(error => {
        console.log("Error => ", error, "Data => ", error.response.data);
      })
      .finally(() => {
        // store.commit("stopLoading");
      });
  },
  setCategories(data) {
    const url = `/api/books/${data.id}/set-categories/`;
    return apiCall
      .post(url, data)
      .then(res => {
        console.log(res);
        this.getBooks();
      })
      .catch(error => {
        console.log("Error => ", error, "Data => ", error.response.data);
      })
      .finally(() => {
        // store.commit("stopLoading");
      });
  },
  setAuthors(data) {
    const url = `/api/books/${data.id}/set-authors/`;
    console.log("set authors triggered => ", url);
    return apiCall
      .post(url, data)
      .then(res => {
        console.log("post başarılı :", res);
        this.getBooks();
      })
      .catch(error => {
        console.log("Error => ", error, "Data => ", error.response.data);
      })
      .finally(() => {
        // store.commit("stopLoading");
      });
  }
};
