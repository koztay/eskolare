<template>
  <v-footer height="auto">
    <v-container fluid class="secondary lighten-2 white--text text-xs-center">
      <v-layout row wrap>
        <v-flex xs12 md4 order-md1>
          <v-card tile flat color="secondary lighten-2">
            <v-card-text
              class="white--text"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, incidunt quos. Et dolore ut voluptatem voluptatibus ullam ratione commodi, exercitationem molestias nulla sit deserunt, cupiditate eius atque recusandae illo eveniet.</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 md4 order-md2>
          <v-card tile flat color="secondary lighten-2">
            <v-card-text
              class="white--text"
            >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro odit doloremque molestias voluptatem rem laborum modi minus nisi quas. Velit blanditiis possimus labore rerum beatae, in nulla. Rem, est officia!</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 md4 order-md3>
          <v-card tile flat color="secondary lighten-2">
            <v-card-text
              class="white--text"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis tempora earum at tempore excepturi quasi! Quos repudiandae, atque quibusdam inventore explicabo facilis. Explicabo vitae saepe architecto, perferendis tempora ratione facere.</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-flex xs12>
        <v-card tile flat color="secondary lighten-2">
          <v-card-text class="white--text">
            &copy;2019 —
            <strong>ESKOLARE.COM.BR</strong>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      "fab fa-facebook",
      "fab fa-twitter",
      //   "fab fa-google-plus",
      //   "fab fa-linkedin",
      "fab fa-instagram"
    ]
  })
};
</script>