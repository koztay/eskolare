<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Category</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- <v-col cols="12" sm="6" md="4">
                <v-text-field label="Legal first name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>-->
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
          <v-btn color="blue darken-1" text @click="addCategory">Save</v-btn>
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
      categoryTitle: "",
      parentCategoryId: null
    };
  },
  props: {
    value: Boolean
  },
  computed: {
    ...mapState({ categories: state => state.categories.categories }),
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
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
    addCategory() {
      console.log(this.categoryTitle, this.parentCategoryId);
      const payload = {
        parent: this.parentCategoryId,
        title: this.categoryTitle
      };
      this.$store.dispatch("addCategory", payload).then(() => {
        this.show = false;
      });
    }
  }
};
</script>