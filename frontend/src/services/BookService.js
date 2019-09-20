import apiCall from "../utils/api";
import store from "../store";

export default {
  getBooks() {
    // store.commit("startLoading");
    const url = `/api/books/`;
    console.log("fetchBooks çalışıyor mu?");
    return apiCall
      .get(url)
      .then(response => {
        const data = response.data;
        // console.log(JSON.stringify(data));
        store.commit("setBooks", data);
      })
      .catch(error => {
        console.log("Error => ", error, "Data => ", error.response.data);
      })
      .finally(() => {
        // store.commit("stopLoading");
      });
  },
  getBook(bookId) {
    // store.commit("startLoading");
    const url = `/api/books/${bookId}/`;
    console.log("url ney amk => ", url);
    return apiCall
      .get(url)
      .then(response => {
        const data = response.data;
        console.log(JSON.stringify(data));
        store.commit("setBook", data);
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
  },
  uploadImage(data) {
    const url = `/api/books/${data.id}/upload-image/`;
    console.log("upload Image triggered => ", url);
    return apiCall
      .post(url, data.image)
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
  },
  addToReadList(bookId) {
    // store.commit("startLoading");
    const url = `/api/books/${bookId}/add-to-read-list/`;
    console.log("url ney amk => ", url);
    return apiCall
      .patch(url)
      .then(response => {
        const data = response.data;
        console.log(JSON.stringify(data));
      })
      .catch(error => {
        console.log("Error => ", error, "Data => ", error.response.data);
      })
      .finally(() => {
        // store.commit("stopLoading");
      });
  }
};
