import BookService from "@/services/BookService";

// "title": "test title",
// "description": "test description",
// "image": null,
// "categories": [1,2],
// "authors": [1],
// "reviews": [],
// "read_by": []

const state = {
  book: null,
  books: [],
  bookId: null,
  bookTitle: null,
  bookDescription: null,
  bookImage: null
};

const getters = {
  bookDetail: state => {
    return state.books.find(book => book.id === state.bookId);
  }
};

const mutations = {
  setBooks: (state, books) => {
    state.books = books;
  },
  setBook: (state, book) => {
    state.book = book;
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
  fetchBook(_, bookId) {
    return BookService.getBook(bookId);
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
  addToReadList(_, bookId) {
    console.log("bookId add to readlis için geliyor mu? ", bookId);
    return BookService.addToReadList(bookId);
  },
  uploadImage(_, data) {
    console.log("gelen data ney ? ", data);
    return BookService.uploadImage(data);
  },
  submitReview(_, data) {
    return BookService.submitReview(data);
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
  },
  setCategories(_, data) {
    return BookService.setCategories(data);
  },
  setAuthors(_, data) {
    return BookService.setAuthors(data);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
