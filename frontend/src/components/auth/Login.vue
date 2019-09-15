<template>
  <v-content class="mb-5">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-flex mb-3 text-xs-center red--text v-show="backendError">
            <div>Login failed, username or password is not correct!</div>
          </v-flex>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  prepend-icon="fas fa-user"
                  name="username"
                  label="Username"
                  type="text"
                  v-model="username"
                  :error-messages="usernameErrors"
                  @input="$v.username.$touch()"
                  @blur="$v.username.$touch()"
                  @focus="backendError = false"
                  required
                ></v-text-field>
                <v-text-field
                  prepend-icon="fas fa-lock"
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                  v-model="password"
                  :error-messages="passwordErrors"
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                  @focus="backendError = false"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <router-link :to="{ name: 'forgotPassword'}">
                <v-btn color="primary" flat class="text-capitalize">Forgot Password</v-btn>
              </router-link>
              <router-link :to="{ name: 'signup'}">
                <v-btn color="primary" flat class="text-capitalize">Signup</v-btn>
              </router-link>
              <v-btn
                class="text-capitalize"
                color="primary"
                @click="login"
                :disabled="submitButtonDisabled === true"
              >Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { AUTH_REQUEST } from "@/store/actions/auth";
import { mapGetters } from "vuex";

import { required, minLength } from "vuelidate/lib/validators";
// import theme from "../store/modules/theme";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      backendError: false
    };
  },
  validations: {
    username: { required },
    password: { required, minLength: minLength(8) }
  },
  methods: {
    login: function() {
      this.$v.$touch();
      if (
        this.usernameErrors.length === 0 &&
        this.passwordErrors.length === 0
      ) {
        const { username, password } = this;
        //   console.log({ username, password });
        this.$store
          .dispatch(AUTH_REQUEST, { username, password })
          .then(() => {
            this.$router.push("/account");
          })
          .catch(() => {
            // console.log("error oluştu, hataya göre aksiyon al.");
            // console.log(err.response.data);
            this.backendError = true;
          });
      }
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authStatus", "badLogin"]),
    loading: function() {
      return this.authStatus === "loading" && !this.isAuthenticated;
    },
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      // !this.$v.name.decimal && errors.push('Name must be a number')
      // !this.$v.usernname.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.username.required && errors.push("Kullanıcı adı zorunludur.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      // !this.$v.name.decimal && errors.push('Name must be a number')
      //   !this.$v.usernname.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.password.required && errors.push("Şifre zorunludur.");
      !this.$v.password.minLength &&
        errors.push("Şifreniz en az 8 karakter olmalı.");
      return errors;
    },
    submitButtonDisabled() {
      const formErrorsArray = [...this.usernameErrors, ...this.passwordErrors];
      // console.log(formErrorsArray);
      if (!this.$v.username.$dirty || !this.$v.password.$dirty) {
        return true;
      }
      return formErrorsArray.length > 0;
    }
  }
};
</script>
