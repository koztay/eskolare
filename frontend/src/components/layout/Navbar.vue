<template>
  <span>
    <v-navigation-drawer app v-model="drawer" class="secondary" dark disable-resize-watcher>
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <CategoryTree />
    </v-navigation-drawer>
    <v-toolbar app dark height="66" color="primary" class="hidden-sm-and-down">
      <router-link :to="{ name: 'home'}">
        <v-toolbar-title class="text-uppercase white--text">
          <span class="font-weight-light">Eskolare</span>
          <!-- <span>SE</span> -->
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-flex lg5 md5 sm6 xs6>
        <v-sheet class="pa-2 secondary lighten-2 d-flex">
          <v-text-field
            v-model="searchText"
            label="Search..."
            dark
            flat
            solo-inverted
            hide-details
            clearable
            clear-icon="far fa-times-circle"
            @keyup.native.enter="search"
          ></v-text-field>
        </v-sheet>
      </v-flex>
      <v-icon class="ml-1" @click="search" :disabled="disabled">fas fa-search</v-icon>
      <v-spacer></v-spacer>
      <div>
        <router-link :to="{ name: 'login'}">
          <v-btn v-if="!auth" flat color="white">
            <span>Login</span>
            <v-icon right>fas fa-sign-in-alt</v-icon>
          </v-btn>
        </router-link>
        <router-link :to="{ name: 'signup'}">
          <v-btn v-if="!auth" flat color="white">
            <span>Signup</span>
            <v-icon right>fas fa-user-plus</v-icon>
          </v-btn>
        </router-link>
        <v-btn v-if="auth" flat color="white" @click="logout">
          <span>Logout</span>
          <v-icon right>fas fa-power-off</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <v-toolbar app flat dark height="66" color="primary" class="hidden-md-and-up">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-flex lg5 md5 sm6 xs6>
        <v-sheet class="pa-2 secondary lighten-2">
          <v-text-field
            v-model="searchText"
            label="Search..."
            dark
            flat
            solo-inverted
            hide-details
            clearable
            clear-icon="far fa-times-circle"
            @keyup.native.enter="search"
          ></v-text-field>
        </v-sheet>
      </v-flex>
      <v-icon class="ml-1" @click="search" :disabled="disabled">fas fa-search</v-icon>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'home'}">
        <v-toolbar-title class="text-uppercase white--text">
          <span class="font-weight-light">Eskolare</span>
          <span>.com.br</span>
        </v-toolbar-title>
      </router-link>
    </v-toolbar>
  </span>
</template>

<script>
import { AUTH_LOGOUT } from "@/store/actions/auth";
import CategoryTree from "@/components/CategoryTree";

export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
      searchText: "",
      links: [
        { icon: "dashboard", text: "Dashboard", route: "/" },
        { icon: "folder", text: "My Projects", route: "/projects" },
        { icon: "person", text: "Team", route: "/team" }
      ]
    };
  },

  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT);
    },
    search() {
      console.log("will be searching :", this.searchText);
      this.searchText = "";
    }
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
    disabled() {
      if (this.searchText.length > 3) {
        return false;
      } else {
        return true;
      }
    }
  },
  components: {
    CategoryTree
  }
};
</script>

