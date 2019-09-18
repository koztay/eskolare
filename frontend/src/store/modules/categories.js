import CategoryService from "@/services/CategoryService";

const state = {
  categories: [],
  categoryTitle: "", // this will be used for add or update category title
  parentCategoryId: null
};

const getters = {};

const mutations = {
  setCategories: (state, categories) => {
    state.categories = categories;
  },
  setCategoryTitle: (state, categoryTitle) => {
    console.log("setCategoryTitle mutation çalıştı =>", categoryTitle);
    state.categoryTitle = categoryTitle;
  },
  setParentCategoryId: (state, parentCategoryId) => {
    console.log("setParentCategoryId mutation çalıştı =>", parentCategoryId);
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
    console.log("updateCategoryTitle action çalıştı =>", categoryTitle);
    commit("setCategoryTitle", categoryTitle);
  },
  updateParentCategoryId({ commit }, parentCategoryId) {
    console.log("updateParentCategoryId action çalıştı =>", parentCategoryId);
    commit("setParentCategoryId", parentCategoryId);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
