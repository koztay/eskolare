<template>
  <div>
    <v-card max-width="344" class="pa-2 ma-5" outlined tile>
      <v-list-item>
        <v-list-item-avatar color="grey"></v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">{{book.title}}</v-list-item-title>
          <v-list-item-subtitle>
            by
            <span v-for="(author, index) in book.authors" :key="author.id">
              <span>{{author.name}}</span>
              <span v-if="index+1 < book.authors.length">,&nbsp;</span>
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-img :src="book.image" contain></v-img>

      <!-- <v-card-text>{{book.description}}</v-card-text> -->

      <v-card-actions>
        <v-btn text color="deep-purple accent-4">Read</v-btn>
        <v-btn text color="deep-purple accent-4">Bookmark</v-btn>
        <div class="flex-grow-1"></div>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["book"]
};
</script>