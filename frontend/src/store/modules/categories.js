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
  },
  addCategory(_, data) {
    console.log("bu amına goduğum datası neeeee", data);
    return CategoryService.addCategory(data);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
