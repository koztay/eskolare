<template>
  <div>
    <v-card width="80%" class="mx-auto" v-if="bookDetail">
      <v-row class="py-4 pl-4 ma-5">
        <v-col class="shrink">
          <!-- <v-img contain src="https://cdn.vuetifyjs.com/images/cards/store.jpg"></v-img> -->
          <v-img v-if="bookDetail.image" width="400" contain :src="bookDetail.image"></v-img>
        </v-col>
        <v-col>
          <v-card-text>
            <div class="headline mb-2">{{bookDetail.title}}</div>
            <v-container class="pa-0">
              by
              <span v-for="(author, index) in booksAuthors" :key="author.id">
                <span>{{author.name}}</span>
                <span v-if="index+1 < booksAuthors.length">,&nbsp;</span>
              </span>
              <span :v-html="booksAuthors"></span>
            </v-container>
            <v-container class="pa-0">
              categories :
              <span v-for="(category, index) in booksCategories" :key="category.id">
                <span>{{category.title}}</span>
                <span v-if="index+1 < flatCategories.length">,&nbsp;</span>
              </span>
            </v-container>
            <v-container class="pa-0">read by : {{ bookDetail.read_by.length }} people</v-container>
          </v-card-text>
          <v-container class="pa-0">
            <v-card-text>{{bookDetail.description}}</v-card-text>
          </v-container>
        </v-col>
      </v-row>
      <v-card-actions>
        <div>
          <v-btn text color="primary" @click="addToReadList">Add to My Read List</v-btn>
        </div>
        <div class="flex-grow-1"></div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data: () => ({}),
  components: {},
  props: ["bookId"],
  computed: {
    ...mapState({
      profile: state => state.user.profile,
      stateBookId: state => state.books.bookId,
      books: state => state.books.books,
      authors: state => state.authors.authors,
      categories: state => state.categories.categories
    }),
    ...mapGetters(["bookDetail"]),
    booksAuthors() {
      var filtered = this.authors.filter(author => {
        return this.bookDetail.authors.indexOf(author.id) > -1;
      });
      return filtered;
    },
    booksCategories() {
      var filtered = this.flatCategories.filter(category => {
        return this.bookDetail.categories.indexOf(category.id) > -1;
      });
      return filtered;
    },
    flatCategories() {
      // move this method to book detail for listing categories.
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
    addToReadList() {
      this.$store.dispatch("addToReadList", this.bookId);
      console.log("booksAuthors  => ", this.bookAuthors);
    }
  },
  created() {
    this.$store.dispatch("fetchBooks").then(() => {
      this.$store.dispatch("updateBookId", this.bookId);
    }); // this needed for getting book detail
  },
  updated() {
    console.log("bookDetail", this.bookDetail);
  }
};
</script>
