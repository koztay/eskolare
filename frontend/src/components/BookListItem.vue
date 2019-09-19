<template>
  <v-col cols="3">
    <v-card max-width="344" class="pa-2 ma-1" outlined tile>
      <v-list-item>
        <v-list-item-avatar color="grey"></v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">{{book.title}}</v-list-item-title>
          <v-list-item-subtitle>
            by
            <span v-for="(author, index) in book.authors" :key="author.id">
              <span>{{author.name}}</span>
              <span v-if="index+1 < book.authors.length">,&nbsp;</span>
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-img v-if="book.image" :src="book.image" contain></v-img>
      <v-card-actions>
        <div v-if="profile.is_staff">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on" icon @click="editBook(book)">
                <v-icon>fa-edit</v-icon>
              </v-btn>
            </template>
            <span>Edit Book</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on" icon @click="editBook(book)">
                <v-icon>fa-image</v-icon>
              </v-btn>
            </template>
            <span>Add/Edit Image</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on" icon>
                <v-icon>fa-book</v-icon>
              </v-btn>
            </template>
            <span>Add/Edit Categories</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on" icon>
                <v-icon>fa-user</v-icon>
              </v-btn>
            </template>
            <span>Add/Edit Authors</span>
          </v-tooltip>
        </div>
        <div v-else>
          <v-btn text color="deep-purple accent-4">Read</v-btn>
          <v-btn text color="deep-purple accent-4">Bookmark</v-btn>
        </div>
        <div class="flex-grow-1"></div>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["book"],
  computed: {
    ...mapState({
      profile: state => state.user.profile
    })
  },
  methods: {
    editBook(book) {
      this.$emit("editClicked", book);
    },
    setSelectedBook() {
      this.$store.dispatch("fetchBooks");
    }
  }
};
</script>