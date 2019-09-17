import CategoryService from "@/services/CategoryService";

const state = {
  categories: []
};

const getters = {};

const mutations = {
  setCategories: (state, categories) => {
    state.categories = categories;
  }
};

const actions = {
  fetchCategories() {
    return CategoryService.getCategories();
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
