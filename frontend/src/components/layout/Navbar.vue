<template>
  <div>
    <v-navigation-drawer
      app
      v-model="drawer"
      class="secondary"
      dark
      temporary
      disable-resize-watcher
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Book Catalog App</v-list-item-title>
          <v-list-item-subtitle>for Eskolare Django Challenge</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-if="auth" router :to="{name:'account'}" link>
          <v-list-item-icon>
            <v-icon>fas fa-user</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isStaff" router :to="{name:'manage-categories'}" link>
          <v-list-item-icon>
            <v-icon>fas fa-book</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Manage Categories</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isStaff" router :to="{name:'manage-authors'}" link>
          <v-list-item-icon>
            <v-icon>fas fa-edit</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Manage Authors</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon v-if="auth" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <!-- <span
          @click="navigateHome"
          @mouseover="hover = true"
          @mouseleave="hover = false"
          :class="{ active: hover }"
        >ESKOLARE</span>-->
        <router-link :to="{ name:'home'}">
          <span>ESKOLARE</span>
        </router-link>
      </v-toolbar-title>

      <div class="flex-grow-1"></div>

      <!-- <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>-->

      <!-- <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>-->
      <div>
        <router-link :to="{ name: 'login'}">
          <v-btn v-if="!auth" text color="white">
            <span>Login</span>
            <v-icon right>fas fa-sign-in-alt</v-icon>
          </v-btn>
        </router-link>
        <router-link :to="{ name: 'signup'}">
          <v-btn v-if="!auth" text color="white">
            <span>Signup</span>
            <v-icon right>fas fa-user-plus</v-icon>
          </v-btn>
        </router-link>
        <v-btn v-if="auth" text color="white" @click="logout">
          <span>Logout</span>
          <v-icon right>fas fa-power-off</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
  </div>
  <!-- <v-toolbar dark height="66" color="primary" class="hidden-sm-and-down">
      <router-link :to="{ name: 'home'}">
        <v-toolbar-title class="text-uppercase white--text">
          <span class="font-weight-light">Eskolare</span>
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
          <v-btn v-if="!auth" text color="white">
            <span>Login</span>
            <v-icon right>fas fa-sign-in-alt</v-icon>
          </v-btn>
        </router-link>
        <router-link :to="{ name: 'signup'}">
          <v-btn v-if="!auth" text color="white">
            <span>Signup</span>
            <v-icon right>fas fa-user-plus</v-icon>
          </v-btn>
        </router-link>
        <v-btn v-if="auth" text color="white" @click="logout">
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
  </v-toolbar>-->
</template>


<script>
import { mapState } from "vuex";
import { AUTH_LOGOUT } from "@/store/actions/auth";
import CategoryTree from "@/components/CategoryTree";

export default {
  name: "Navbar",
  computed: {
    ...mapState({ profile: state => state.user.profile })
  },
  data() {
    return {
      drawer: false,
      hower: false,
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
      this.searchText = "";
    },
    navigateHome() {
      this.$router.push("/");
    }
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
    isStaff() {
      const profile = this.$store.getters.getProfile;
      return profile.is_superuser || profile.is_staff;
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

<style scoped>
.v-application a {
  color: white;
}
</style>

