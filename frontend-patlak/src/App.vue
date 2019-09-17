<template>
  <v-app>
    <Navbar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default {
  name: "App",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      //
    };
  },
  created() {
    this.$store.dispatch("tryAutoLogin");
  }
};
</script>
