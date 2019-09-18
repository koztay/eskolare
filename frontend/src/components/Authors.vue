<template>
  <div>
    <v-alert
      class="mt-5"
      dense
      outlined
      dismissable
      type="error"
      v-if="alertMessage"
    >{{alertMessage}}</v-alert>
    <v-card class="mx-auto mt-5 mb-5" width="70%">
      <v-sheet class="pa-2 secondary lighten-2">
        <v-text-field
          v-model="search"
          label="Search..."
          dark
          flat
          solo-inverted
          hide-details
          clearable
          clear-icon="far fa-times-circle"
        ></v-text-field>
      </v-sheet>
      <v-card-text>
        <v-treeview
          open-all
          return-object
          ref="authorTree"
          :items="this.authors"
          :search="search"
          :open.sync="open"
          :filter="filter"
          item-text="name"
          item-key="id"
          selectable
          selection-type="independent"
          @input="itemSelected"
        ></v-treeview>
      </v-card-text>
      <div>
        <v-card-actions>
          <v-btn text v-if="this.selectedItems.length === 0" @click="addAuthor">Add Author</v-btn>
          <v-btn
            text
            @click="editAuthor"
            v-if="this.selectedItems.length === 1"
          >Edit Selected Author</v-btn>
          <v-btn
            text
            @click="deleteAuthorConfirm"
            v-if="this.selectedItems.length === 1"
          >Delete Selected Author</v-btn>
        </v-card-actions>
      </div>
    </v-card>
    <AuthorForm v-model="authorDialog" :headLine="this.headLine" />
    <v-dialog v-model="confirm" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Delete</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <span>Are you sure, you want to delete author : {{this.stateAuthorName}} ?</span>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="confirm = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteAuthor">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AuthorForm from "../components/modal-forms/AuthorForm.vue";

export default {
  data() {
    return {
      alertMessage: "",
      selectedItems: [],
      open: [],
      search: null,
      caseSensitive: false,
      openall: true,
      filteredAuthors: [],
      authorDialog: false,
      headLine: "",
      confirm: false
    };
  },
  components: {
    AuthorForm
  },
  methods: {
    itemSelected(evt) {
      this.selectedItems = evt;
      if (this.selectedItems.length > 1) {
        this.alertMessage = "You should select only 1 item.";
      } else {
        this.alertMessage = "";
      }
      if (this.selectedItems.length === 1) {
        this.$store.dispatch("updateAuthorName", this.selectedItems[0].name);
        this.$store.dispatch("updateAuthorId", this.selectedItems[0].id);
      } else {
        this.$store.dispatch("updateAuthorName", null);
        this.$store.dispatch("updateAuthorId", null);
      }
    },
    addAuthor() {
      this.headLine = "Add Author";
      this.alertMessage = "";
      this.authorDialog = true;
    },
    editAuthor() {
      this.headLine = "Edit Author";
      if (this.selectedItems.length > 1) {
        this.alertMessage = "Cannot edit more than 1 item.";
      }
      this.authorDialog = true;
    },
    deleteAuthorConfirm() {
      if (this.selectedItems.length > 1) {
        this.alertMessage = "Cannot delete more than 1 item.";
      }
      this.confirm = true;
    },
    deleteAuthor() {
      this.$store
        .dispatch("deleteAuthor", { id: this.stateAuthorId })
        .then(() => {
          this.confirm = false;
        });
    }
  },
  created() {
    this.$store.dispatch("fetchAuthors");
  },
  computed: {
    ...mapState({
      authors: state => state.authors.authors,
      stateAuthorName: state => state.authors.authorName,
      stateAuthorId: state => state.authors.authorId
    }),
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    }
  }
};
</script>

