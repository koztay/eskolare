<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <h1>Posts</h1>
      <div v-for="(post, i) in posts" :key="i">
        <v-flex xs12>{{ post.title }}</v-flex>
        <v-flex xs12>{{ post.content }}</v-flex>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import apiCall from "@/utils/api";

export default {
  name: "posts",
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      apiCall
        .get("/api/posts")
        .then(resp => {
          this.posts = resp.data.results;
          // console.log(resp.data.results);
        })
        .catch(() => {
          // console.log(err);
          console.log("Handle bad credentials here");
        });
    }
  }
};
</script>
