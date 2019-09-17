
<template>
  <div>
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
          :items="this.categories"
          :search="search"
          :open.sync="open"
          :filter="filter"
          item-text="title"
          hoverable
          activatable
          class="treeview"
        ></v-treeview>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      // categories: [],
      open: [],
      search: null,
      caseSensitive: false,
      openall: false,
      filteredCategories: []
    };
  },
  methods: {},
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

