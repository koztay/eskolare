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
    return apiCall
      .get(url)
      .then(response => {
        const data = response.data;
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
    console.log(data);
    const url = `/api/books/`;
    return apiCall
      .post(url, data)
      .then(() => {
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
    const url = `/api/books/${data.id}/`;

    return apiCall
      .patch(url, data)
      .then(() => {
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
    const url = `/api/books/${data.id}/`;

    return apiCall
      .delete(url, data)
      .then(() => {
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
      .then(() => {
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
    return apiCall
      .post(url, data)
      .then(() => {
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
    return apiCall
      .post(url, data.image)
      .then(() => {
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
    return apiCall
      .patch(url)
      .then(() => {
        this.getBooks();
      })
      .catch(error => {
        console.log("Error => ", error, "Data => ", error.response.data);
      })
      .finally(() => {
        // store.commit("stopLoading");
      });
  },
  submitReview(data) {
    const url = `/api/reviews/`;
    return apiCall
      .post(url, data)
      .then(() => {
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
