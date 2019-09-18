import AuthorService from "@/services/AuthorService";

const state = {
  authors: [],
  authorName: null,
  authorId: null
};

const getters = {};

const mutations = {
  setAuthors: (state, authors) => {
    state.authors = authors;
  },
  setAuthorname: (state, authorName) => {
    state.authorName = authorName;
  },
  setAuthorId: (state, authorId) => {
    state.authorId = authorId;
  }
};

const actions = {
  fetchAuthors() {
    return AuthorService.getAuthors();
  },
  addAuthor(_, data) {
    return AuthorService.addAuthor(data);
  },
  updateAuthor(_, data) {
    return AuthorService.updateAuthor(data);
  },
  updateAuhtorname({ commit }, authorName) {
    commit("setAuthorname", authorName);
  },
  updateCategoryId({ commit }, authorId) {
    commit("setAuthorId", authorId);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
