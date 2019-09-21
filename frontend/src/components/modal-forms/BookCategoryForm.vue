<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span v-if="book" class="headline">Select Categories for "{{book.title}}"</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
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
                      v-if="this.book"
                      v-model="selectedCategories"
                      open-all
                      ref="categoryTree"
                      :items="categories"
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
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <!-- <small>*indicates required field</small> -->
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="show = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="setCategories">Save</v-btn>
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
      payload: null,
      search: null,
      open: [],
      selectedItems: []
    };
  },
  props: {
    value: Boolean,
    book: Object
  },
  computed: {
    ...mapState({
      categories: state => state.categories.categories,
      stateBookId: state => state.books.bookId
    }),
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },

    selectedCategories: {
      get() {
        return this.book.categories;
      },
      set() {
        return this.selectedItems;
      }
    },
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    }
  },
  methods: {
    itemSelected(evt) {
      this.selectedItems = evt;

      this.payload = {
        categories: this.selectedItems,
        id: this.book.id
      };
    },
    setCategories() {
      this.$store.dispatch("setCategories", this.payload).then(() => {
        this.show = false;
        this.book = null;
      });
    }
  },
  created() {
    this.$store.dispatch("fetchCategories");
  }
};
</script>