<template>
  <v-container grid-list-md mt-5>
    <v-layout>
      <v-card>
        <v-card-title>
          <span class="headline">Create Post</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Başlık*" required v-model="title"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="İçerik*" required v-model="content"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*zorunlu alanlar</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="create">Ekle</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import apiCall from "../utils/api.js";
export default {
  name: "createPost",
  data() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    create: function() {
      const { title, content } = this;
      apiCall
        .post("/api/posts/", { title, content })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  //   computed: {
  //     ...mapGetters(["isAuthenticated", "authStatus", "badLogin"]),
  //     loading: function() {
  //       return this.authStatus === "loading" && !this.isAuthenticated;
  //     }
  //   }
};
</script>

<style>
</style>
