<template>
  <div>
    <CategoryTreeVue />
  </div>
</template>


<script>
// import { mapState } from "vuex";
import CategoryTreeVue from "../components/CategoryTree.vue";

export default {
  components: {
    CategoryTreeVue
  },
  computed: {
    // ...mapState(["categories"])
  },
  methods: {}
  // created() {
  //   this.$store.dispatch("fetchCategories");
  // }
};
</script>