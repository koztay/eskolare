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
                <v-text-field v-model="authorName" label="Author Name*" required></v-text-field>
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
      authors: state => state.authors.authors,
      stateAuthorName: state => state.authors.authorName,
      stateAuthorId: state => state.authors.authorId
    }),
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    authorName: {
      get() {
        return this.stateAuthorName;
      },
      set(value) {
        this.$store.dispatch("updateAuthorName", value);
      }
    }
  },
  methods: {
    getMethod() {
      if (this.headLine === "Add Author") {
        return this.addAuthor();
      } else {
        return this.updateAuthor();
      }
    },
    addAuthor() {
      this.$store.dispatch("addAuthor", this.payload).then(() => {
        this.show = false;
      });
    },
    updateAuthor() {
      console.log("edit Author çalışacak");
      this.$store.dispatch("updateAuthor", this.payload).then(() => {
        this.show = false;
      });
    }
  },
  updated() {
    this.payload = {
      name: this.authorName,
      id: this.stateAuthorId
    };
  }
};
</script>