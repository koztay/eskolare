<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{headLine}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12"></v-col>
              <v-col cols="12">
                <v-text-field v-model="bookTitle" label="Book Title*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="bookDescription" label="Book Description*" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="show = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="getMethod">Save</v-btn>
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
      payload: null
    };
  },
  props: {
    value: Boolean,
    headLine: String
  },
  computed: {
    ...mapState({
      books: state => state.books.books,
      stateBookTitle: state => state.books.bookTitle,
      stateBookDescription: state => state.books.bookDescription,
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
    bookTitle: {
      get() {
        return this.stateBookTitle;
      },
      set(value) {
        this.$store.dispatch("updateBookTitle", value);
      }
    },
    bookDescription: {
      get() {
        return this.stateBookDescription;
      },
      set(value) {
        this.$store.dispatch("updateBookDescription", value);
      }
    }
  },
  methods: {
    getMethod() {
      if (this.headLine === "Add Book") {
        return this.addBook();
      } else {
        return this.updateBook();
      }
    },
    addBook() {
      this.$store.dispatch("addBook", this.payload).then(() => {
        this.show = false;
        this.resetState();
      });
    },
    updateBook() {
      this.$store.dispatch("updateBook", this.payload).then(() => {
        this.show = false;
        this.resetState();
      });
    },
    resetState() {
      this.bookTitle = null;
      this.bookDescription = null;
      this.bookId = null;
    }
  },
  updated() {
    this.payload = {
      title: this.bookTitle,
      description: this.bookDescription,
      id: this.stateBookId
    };
  }
};
</script>