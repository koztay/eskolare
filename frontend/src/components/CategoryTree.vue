
<template>
  <div>
    <v-alert
      class="mt-5"
      dense
      outlined
      dismissable
      type="error"
      v-if="alertMessage"
    >{{alertMessage}}</v-alert>
    <v-card class="mx-auto mt-5 mb-5" width="70%">
      <v-sheet class="pa-2 secondary lighten-2">
        <v-text-field
          v-model="search"
          label="Search..."
          dark
          flat
          solo-inverted
          hide-details
          clearable
          clear-icon="far fa-times-circle"
        ></v-text-field>
      </v-sheet>
      <v-card-text>
        <v-treeview
          open-all
          ref="categoryTree"
          :items="this.categories"
          :search="search"
          :open.sync="open"
          :filter="filter"
          item-text="title"
          item-key="id"
          selectable
          selection-type="independent"
          @input="itemSelected"
        ></v-treeview>
      </v-card-text>
      <div>
        <v-card-actions>
          <v-btn text @click="addCategory">Add Category</v-btn>
          <v-btn
            text
            @click="editCategory"
            v-if="this.selectedItems.length === 1"
          >Edit Selected Category</v-btn>
          <v-btn
            text
            @click="deleteCategory"
            v-if="this.selectedItems.length === 1"
          >Delete Selected Category</v-btn>
        </v-card-actions>
      </div>
    </v-card>
    <AddCategoryForm v-model="addCategoryDialog" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddCategoryForm from "../components/modal-forms/category/AddCategoryForm.vue";

export default {
  data() {
    return {
      alertMessage: "",
      selectedItems: [],
      open: [],
      search: null,
      caseSensitive: false,
      openall: true,
      filteredCategories: [],
      addCategoryDialog: false
    };
  },
  components: {
    AddCategoryForm
  },
  methods: {
    itemSelected(evt) {
      this.selectedItems = evt;
      if (this.selectedItems.length > 1) {
        this.alertMessage = "You should select only 1 item.";
      } else {
        this.alertMessage = "";
      }
    },
    addCategory() {
      this.alertMessage = "";
      console.log("categoryTree ney => ", this.$refs.categoryTree.selection);
      this.$refs.categoryTree.selection = [];
      this.$refs.categoryTree.openall = true;
      this.addCategoryDialog = true;
    },
    editCategory() {
      if (this.selectedItems.length > 1) {
        this.alertMessage = "Cannot edit more than 1 item.";
      }
    },
    deleteCategory() {
      if (this.selectedItems.length > 1) {
        this.alertMessage = "Cannot delete more than 1 item.";
      }
    }
  },
  created() {
    this.$store.dispatch("fetchCategories");
  },
  computed: {
    ...mapState({ categories: state => state.categories.categories }),
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    }
  }
};
</script>

