<template>
  <div>
    <!-- <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex style="width: 1000px;">
          <v-card color="grey lighten-2">
            <v-fab-transition>
              <v-btn color="primary" dark absolute top right fab @click="addBook">
                <v-icon>fa-plus</v-icon>
              </v-btn>
            </v-fab-transition>
            <v-row no-gutters>
              <v-col cols="3">
                <BookListItem v-for="book in books" :book="book" :key="book.id"></BookListItem>
              </v-col>
            </v-row>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <BookForm v-model="bookDialog" :headLine="this.headLine" />-->

    <v-container class="grey lighten-5">
      <v-fab-transition>
        <v-btn color="primary" class="add-button" dark top absolute right fab @click="addBook">
          <v-icon>fa-plus</v-icon>
        </v-btn>
      </v-fab-transition>
      <v-row no-gutters>
        <BookListItem v-for="book in books" :book="book" :key="book.id"></BookListItem>
      </v-row>
    </v-container>
    <BookForm v-model="bookDialog" :headLine="this.headLine" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import BookListItem from "../components/BookListItem";
import BookForm from "../components/modal-forms/BookForm";

export default {
  data: () => ({
    bookDialog: false
  }),
  components: {
    BookListItem,
    BookForm
  },
  computed: {
    ...mapState({
      books: state => state.books.books,
      stateBookTitle: state => state.books.bookTitle,
      stateBookId: state => state.books.bookId
    })
  },
  methods: {
    addBook() {
      this.headLine = "Add Book";
      this.alertMessage = "";
      this.bookDialog = true;
    }
  },
  created() {
    this.$store.dispatch("fetchBooks");
  }
};
</script>

<style lang="scss">
.add-button {
  margin-top: 100px;
}
</style>