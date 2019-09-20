<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span v-if="book" class="headline">Upload Image for "{{book.title}}"</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-card class="mx-auto mt-5 mb-5" width="70%">
                  <v-card-text>
                    <input
                      type="file"
                      accept="image/*"
                      @change="imageSelected($event)"
                      id="file-input"
                    />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <!-- <small>*indicates required field</small> -->
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="show = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="uploadImage">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import apiCall from "@/utils/api";
import { mapState } from "vuex";

export default {
  data() {
    return {
      payload: null,
      open: [],
      selectedFile: null
    };
  },
  props: {
    value: Boolean,
    book: Object
  },
  computed: {
    ...mapState({
      stateBookId: state => state.books.bookId
    }),
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    uploadImage() {
      this.$store.dispatch("uploadImage", this.payload).then(() => {
        this.show = false;
        // this.book = null;
      });
    },
    imageSelected(event) {
      this.selectedFile = event.target.files[0];
      const formData = new FormData();
      formData.append("image", this.selectedFile, this.selectedFile.name);
      this.payload = { id: this.book.id, image: formData };
    }
  }
};
</script>