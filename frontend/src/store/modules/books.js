import BookService from "@/services/BookService";

// "title": "test title",
// "description": "test description",
// "image": null,
// "categories": [1,2],
// "authors": [1],
// "reviews": [],
// "read_by": []

const state = {
  books: [],
  bookId: null,
  bookTitle: null,
  bookDescription: null,
  bookImage: null
};

const getters = {};

const mutations = {
  setBooks: (state, books) => {
    state.books = books;
  },
  setBookId: (state, bookId) => {
    state.bookId = bookId;
  },
  setBookTitle: (state, bookTitle) => {
    state.bookTitle = bookTitle;
  },
  setBookDescription: (state, bookDescription) => {
    state.bookDescription = bookDescription;
  },
  setBookImage: (state, bookImage) => {
    state.bookImage = bookImage;
  }
};

const actions = {
  fetchBooks() {
    return BookService.getBooks();
  },
  addBook(_, data) {
    return BookService.addBook(data);
  },
  updateBook(_, data) {
    return BookService.updateBook(data);
  },
  deleteBook(_, data) {
    return BookService.deleteBook(data);
  },
  updateBookId({ commit }, bookId) {
    commit("setBookId", bookId);
  },
  updateBookTitle({ commit }, bookTitle) {
    commit("setBookTitle", bookTitle);
  },
  updateBookDescription({ commit }, bookDescription) {
    commit("setBookDescription", bookDescription);
  },
  setBookImage({ commit }, bookImage) {
    commit("setBookImage", bookImage);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
