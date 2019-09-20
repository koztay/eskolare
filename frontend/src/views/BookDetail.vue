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
          <v-btn
            text
            color="primary"
            @click="addToReadList"
            :disabled="readByMe"
          >{{this.readByMe ? "You Read This Book": "Add to My Read List" }}</v-btn>
        </v-col>
      </v-row>
      <v-divider class="mx-4"></v-divider>
      <v-container v-if="!reviewedByMe">
        <v-textarea auto-grow v-model="review" label="Add your review"></v-textarea>
        <v-btn class="ma-2" outlined color="primary" @click="submitReview">Submit Your Review</v-btn>
      </v-container>
      <v-container v-if="bookDetail.reviews">
        <v-card v-for="review in bookDetail.reviews" :key="review.id" class="mx-auto" outlined>
          <v-list-item>
            <v-list-item-content>
              <div class="overline mb-4">review by : {{review.username}}</div>
              <!-- <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title> -->
              <div>{{review.review}}</div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data: () => ({
    review: ""
  }),
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
    },
    readByMe() {
      return this.bookDetail.read_by.indexOf(this.profile.pk) > -1;
    },
    reviewedByMe() {
      if (this.bookDetail.reviews) {
        const bookReviewsByMe = this.bookDetail.reviews.find(
          review => review.user === this.profile.pk
        );
        return !!bookReviewsByMe;
      } else {
        return false;
      }
    }
  },
  methods: {
    addToReadList() {
      this.$store.dispatch("addToReadList", this.bookId);
      console.log("booksAuthors  => ", this.bookAuthors);
    },
    submitReview() {
      const payload = {
        user: this.profile.pk,
        book: this.bookId,
        review: this.review
      };
      this.$store.dispatch("submitReview", payload);
    }
  },
  created() {
    this.$store.dispatch("fetchBooks").then(() => {
      this.$store.dispatch("updateBookId", this.bookId);
    }); // this needed for getting book detail
  },
  updated() {
    console.log("bookDetail", this.bookDetail);
    console.log("profile", JSON.stringify(this.profile));
    console.log("reviewdByMe", JSON.stringify(this.reviewdByMe));
  }
};
</script>
