<template>
  <div>
    <v-container class="grey lighten-5">
      <v-fab-transition v-if="profile.is_superuser||profile.is_staff">
        <v-btn color="primary" class="add-button" dark top absolute right fab @click="addBook">
          <v-icon>fa-plus</v-icon>
        </v-btn>
      </v-fab-transition>
      <span class="display-1">Available Books :</span>
      <v-row no-gutters>
        <BookListItem
          v-for="book in books"
          :book="book"
          :key="book.id"
          @editClicked="editBook(book)"
          @setCategoriesClicked="setCategories(book)"
          @setAuthorsClicked="setAuthors(book)"
          @uploadImageClicked="uploadImage(book)"
        ></BookListItem>
      </v-row>
    </v-container>
    <BookForm v-model="bookDialog" :headLine="this.headLine" />
    <BookCategoryForm v-model="categoryDialog" :book="this.book" />
    <BookAuthorForm v-model="authorDialog" :book="this.book" />
    <BookImageForm v-model="uploadImageDialog" :book="this.book" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import BookListItem from "../components/BookListItem";
import BookForm from "../components/modal-forms/BookForm";
import BookCategoryForm from "../components/modal-forms/BookCategoryForm";
import BookAuthorForm from "../components/modal-forms/BookAuthorForm";
import BookImageForm from "../components/modal-forms/BookImageForm";

export default {
  data: () => ({
    bookDialog: false,
    categoryDialog: false,
    authorDialog: false,
    uploadImageDialog: false,
    headLine: "",
    book: null
  }),
  components: {
    BookListItem,
    BookForm,
    BookCategoryForm,
    BookAuthorForm,
    BookImageForm
  },
  computed: {
    ...mapState({
      profile: state => state.user.profile,
      books: state => state.books.books,
      stateBookTitle: state => state.books.bookTitle,
      stateBookId: state => state.books.bookId
    })
  },
  methods: {
    addBook() {
      this.headLine = "Add Book";
      this.alertMessage = "";
      this.setSelectedBook({ id: null, title: null, description: null });
      this.bookDialog = true;
    },
    editBook(book) {
      this.headLine = "Edit Book";
      this.setSelectedBook(book);
      this.bookDialog = true;
    },
    setCategories(book) {
      this.book = book;
      this.setSelectedBook(book);
      this.categoryDialog = true;
    },
    setAuthors(book) {
      this.book = book;
      this.setSelectedBook(book);
      this.authorDialog = true;
    },
    setSelectedBook(book) {
      this.$store.dispatch("updateBookId", book.id);
      this.$store.dispatch("updateBookTitle", book.title);
      this.$store.dispatch("updateBookDescription", book.description);
    },
    uploadImage(book) {
      this.book = book;
      this.setSelectedBook(book);
      this.uploadImageDialog = true;
    }
  },
  created() {
    this.$store.dispatch("fetchBooks");
  }
};
</script>

<style lang="scss" scoped>
.add-button {
  margin-top: 100px;
}
</style>