<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{headLine}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  :items="flatCategories"
                  v-model="parentCategoryId"
                  item-text="title"
                  item-value="id"
                  label="Parent"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="categoryTitle" label="Category Name*" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="show = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="getMethod">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      payload: null
    };
  },
  props: {
    value: Boolean,
    headLine: String
  },
  computed: {
    ...mapState({
      categories: state => state.categories.categories,
      stateCategoryTitle: state => state.categories.categoryTitle,
      stateParentCategoryId: state => state.categories.parentCategoryId,
      stateCategoryId: state => state.categories.categoryId
    }),
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    categoryTitle: {
      get() {
        return this.stateCategoryTitle;
      },
      set(value) {
        this.$store.dispatch("updateCategoryTitle", value);
      }
    },
    parentCategoryId: {
      get() {
        return this.stateParentCategoryId;
      },
      set(value) {
        this.$store.dispatch("updateParentCategoryId", value);
      }
    },
    flatCategories() {
      let flatten = [];
      const flattenCategory = category => {
        let flatCategory = { id: category.id, title: category.title };
        flatten.push(flatCategory);
        if (category.children.length > 0) {
          category.children.forEach(element => {
            flattenCategory(element);
          });
        }
      };
      this.categories.forEach(element => {
        flattenCategory(element);
      });
      return flatten;
    }
  },
  methods: {
    getMethod() {
      if (this.headLine === "Add Category") {
        return this.addCategory();
      } else {
        return this.updateCategory();
      }
    },
    addCategory() {
      this.$store.dispatch("addCategory", this.payload).then(() => {
        this.show = false;
      });
    },
    updateCategory() {
      this.$store.dispatch("updateCategory", this.payload).then(() => {
        this.show = false;
      });
    }
  },
  updated() {
    this.payload = {
      parent: this.parentCategoryId,
      title: this.categoryTitle,
      id: this.stateCategoryId
    };
  }
};
</script>