<template>
  <div>
    <v-card>
      <v-card-title>Available Books</v-card-title>
      <v-card class="d-flex justify-center mb-6" color="grey lighten-2" flat tile>
        <v-fab-transition>
          <v-btn color="primary" dark absolute top right fab>
            <v-icon>fa-plus</v-icon>
          </v-btn>
        </v-fab-transition>
        <BookListItem v-for="book in books" :book="book" :key="book.id"></BookListItem>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BookListItem from "../components/BookListItem.vue";

export default {
  data: () => ({}),
  components: {
    BookListItem
  },
  computed: {
    ...mapState({
      books: state => state.books.books,
      stateBookTitle: state => state.books.bookTitle,
      stateBookId: state => state.books.bookId
    })
  },
  created() {
    this.$store.dispatch("fetchBooks");
  }
};
</script>