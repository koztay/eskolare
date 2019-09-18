import CategoryService from "@/services/CategoryService";

const state = {
  categories: [],
  categoryTitle: null,
  categoryId: null,
  parentCategoryId: null
};

const getters = {};

const mutations = {
  setCategories: (state, categories) => {
    state.categories = categories;
  },
  setCategoryTitle: (state, categoryTitle) => {
    state.categoryTitle = categoryTitle;
  },
  setCategoryId: (state, categoryId) => {
    state.categoryId = categoryId;
  },
  setParentCategoryId: (state, parentCategoryId) => {
    state.parentCategoryId = parentCategoryId;
  }
};

const actions = {
  fetchCategories() {
    return CategoryService.getCategories();
  },
  addCategory(_, data) {
    return CategoryService.addCategory(data);
  },
  updateCategory(_, data) {
    return CategoryService.updateCategory(data);
  },
  updateCategoryTitle({ commit }, categoryTitle) {
    commit("setCategoryTitle", categoryTitle);
  },
  updateCategoryId({ commit }, categoryId) {
    commit("setCategoryId", categoryId);
  },
  updateParentCategoryId({ commit }, parentCategoryId) {
    commit("setParentCategoryId", parentCategoryId);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
