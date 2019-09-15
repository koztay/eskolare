
<template>
  <v-card class="mx-auto category-tree" max-width="500" color="secondary">
    <v-sheet class="pa-2 secondary lighten-2">
      <v-text-field
        v-model="search"
        label="Kategori Ara..."
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
        :items="categories"
        :search="search"
        :open.sync="open"
        :filter="filter"
        item-text="title"
        hoverable
        activatable
      >
        >
        <template v-slot:prepend="{ item }">
          <v-icon
            v-if="item.children"
            v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
          ></v-icon>
        </template>
      </v-treeview>
    </v-card-text>
  </v-card>
</template>

<script>
import apiCall from "@/utils/api";
export default {
  data() {
    return {
      categories: [],
      open: [],
      search: null,
      caseSensitive: false,
      openall: false,
      filteredCategories: []
    };
  },
  methods: {
    fetchCategories() {
      apiCall
        .get("/api/categories/")
        .then(resp => {
          this.categories = resp.data.results;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.fetchCategories();
  },

  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    }
  }
};
</script>
