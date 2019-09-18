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
  addCategory({ state }) {
    return CategoryService.addCategory(state.categoryObject);
  },
  updateCategoryTitle({ commit }, categoryTitle) {
    commit("setCategoryTitle", categoryTitle);
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
