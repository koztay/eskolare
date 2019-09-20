<template>
  <div>
    <v-card width="80%" class="mx-auto">
      <v-row class="py-4 pl-4 ma-5">
        <v-col class="shrink">
          <v-img contain src="https://cdn.vuetifyjs.com/images/cards/store.jpg"></v-img>
        </v-col>
        <v-col>
          <v-card-text>
            <div class="headline mb-2">{{this.book.title}}</div>
            <v-list-item-subtitle>
              by
              <span v-for="(author, index) in booksAuthors" :key="author.id">
                <span>{{author.name}}</span>
                <span v-if="index+1 < booksAuthors.length">,&nbsp;</span>
              </span>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              categories :
              <!-- <span v-for="(author, index) in booksAuthors" :key="author.id">
              <span>{{author.name}}</span>
              <span v-if="index+1 < booksAuthors.length">,&nbsp;</span>
              </span>-->
              Django, Backend Development
            </v-list-item-subtitle>
          </v-card-text>
          <v-container class="pa-0">
            <v-card-text>Visit ten places on our planet that are undergoing the biggest changes today.</v-card-text>
          </v-container>
        </v-col>
      </v-row>
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
              <v-btn color="primary" dark v-on="on" icon @click="uploadImage(book)">
                <v-icon>fa-image</v-icon>
              </v-btn>
            </template>
            <span>Add/Edit Image</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on" icon @click="setCategories(book)">
                <v-icon>fa-book</v-icon>
              </v-btn>
            </template>
            <span>Add/Edit Categories</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on" icon @click="setAuthors(book)">
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
    headLine: ""
    // book: null
  }),
  components: {
    BookListItem,
    BookForm,
    BookCategoryForm,
    BookAuthorForm,
    BookImageForm
  },
  props: ["bookId"],
  computed: {
    ...mapState({
      profile: state => state.user.profile,
      book: state => state.books.book,
      authors: state => state.authors.authors
    }),
    booksAuthors() {
      var filtered = this.authors.filter(author => {
        return this.book.authors.indexOf(author.id) > -1;
      });
      return filtered;
    }
  },
  methods: {
    addBook() {
      this.headLine = "Add Book";
      this.alertMessage = "";
      // this.setSelectedBook({ id: null, title: null, description: null });
      this.bookDialog = true;
    },
    editBook(book) {
      this.headLine = "Edit Book";
      // this.setSelectedBook(book);
      this.bookDialog = true;
    },
    setCategories(book) {
      this.book = book;
      // this.setSelectedBook(book);
      this.categoryDialog = true;
    },
    setAuthors(book) {
      this.book = book;
      // this.setSelectedBook(book);
      this.authorDialog = true;
    },
    uploadImage(book) {
      this.book = book;
      // this.setSelectedBook(book);
      this.uploadImageDialog = true;
    }
  },
  created() {
    this.$store.dispatch("fetchBook", this.bookId);
  },
  mounted() {},
  updated() {
    console.log("route params => :", this.bookId);
  }
};
</script>
