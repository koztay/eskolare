<template>
  <v-content class="mb-5">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-flex mb-3 text-xs-center red--text>
            <div v-for="(message, index) in errorMessages" v-bind:key="index">{{message}}</div>
          </v-flex>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Sign Up</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  prepend-icon="fas fa-user"
                  name="username"
                  label="Username*"
                  type="text"
                  v-model="username"
                  :error-messages="usernameErrors"
                  @input="$v.username.$touch()"
                  @blur="$v.username.$touch()"
                  @focus="backendError = false"
                  required
                ></v-text-field>
                <ul>
                  <li>Only letters, numbers and @/./+/-/_ characters allowed.</li>
                </ul>
                <v-text-field
                  prepend-icon="fas fa-envelope"
                  name="email"
                  label="Email*"
                  required
                  v-model="email"
                  :error-messages="emailErrors"
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                  @focus="backendError = false"
                ></v-text-field>
                <v-text-field
                  prepend-icon="fas fa-lock"
                  name="password1"
                  label="Password*"
                  id="password1"
                  type="password"
                  v-model="password1"
                  :error-messages="password1Errors"
                  @input="$v.password1.$touch()"
                  @blur="$v.password1.$touch()"
                  @focus="backendError = false"
                  required
                ></v-text-field>
                <v-text-field
                  prepend-icon="fas fa-lock"
                  name="password2"
                  label="Password (again)*"
                  id="password2"
                  type="password"
                  v-model="password2"
                  :error-messages="password2Errors"
                  @input="$v.password2.$touch()"
                  @blur="$v.password2.$touch()"
                  @focus="backendError = false"
                  required
                ></v-text-field>
                <ul>
                  <li>Your password can't be too similar to your other personal information.</li>
                  <li>Your password must contain at least 6 characters.</li>
                  <li>Your password can't be a commonly used password.</li>
                  <li>Your password can't be entirely numeric.</li>
                </ul>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <router-link :to="{ name: 'forgotPassword'}">
                <v-btn color="primary" flat class="text-capitalize">Forgot Password</v-btn>
              </router-link>
              <router-link :to="{ name: 'login'}">
                <v-btn color="primary" flat class="text-capitalize">Login</v-btn>
              </router-link>
              <v-btn
                class="text-capitalize"
                color="primary"
                @click="signup"
                :disabled="submitButtonDisabled === true"
              >Signup</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { SIGNUP_REQUEST } from "@/store/actions/auth";
import { mapGetters } from "vuex";

import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
// import theme from "../store/modules/theme";

export default {
  name: "signup",
  data() {
    return {
      username: "",
      email: "",
      password1: "",
      password2: "",
      backendError: false,
      errorMessages: []
    };
  },
  validations: {
    username: { required },
    email: { required, email },
    password1: {
      required,
      minLength: minLength(8)
    },
    password2: {
      sameAsPassword: sameAs("password1"),
      minLength: minLength(8),
      required
    }
  },
  methods: {
    signup: function() {
      const { username, email, password1, password2 } = this;
      this.$store
        .dispatch(SIGNUP_REQUEST, { username, email, password1, password2 })
        .then(() => {
          this.$router.push("/account");
          this.dialog = false;
        })
        .catch(err => {
          // console.log("error oluştu, hataya göre aksiyon al.");
          // console.log(err.response.data);

          if ("username" in err.response.data) {
            this.errorMessages = [...err.response.data.username];
          }
          if ("email" in err.response.data) {
            this.errorMessages = [...err.response.data.email];
          }
          if ("password1" in err.response.data) {
            this.errorMessages = [...err.response.data.password1];
          }
          if ("password2" in err.response.data) {
            this.errorMessages = [...err.response.data.password2];
          }
          console.log(this.errorMessages);
        });
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
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      // !this.$v.name.decimal && errors.push('Name must be a number')
      // !this.$v.usernname.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.email.required && errors.push("ePosta adresi zorunludur.");
      !this.$v.email.email && errors.push("Lütfen ePosta adresi girin.");
      return errors;
    },

    password1Errors() {
      const errors = [];
      if (!this.$v.password1.$dirty) return errors;
      // !this.$v.name.decimal && errors.push('Name must be a number')
      //   !this.$v.usernname.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.password1.required && errors.push("Şifre zorunludur.");
      !this.$v.password1.minLength &&
        errors.push("Şifreniz en az 8 karakter olmalı.");
      return errors;
    },
    password2Errors() {
      const errors = [];
      if (!this.$v.password2.$dirty) return errors;
      // !this.$v.name.decimal && errors.push('Name must be a number')
      //   !this.$v.usernname.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.password2.required && errors.push("Şifre tekrarı zorunludur.");
      !this.$v.password2.sameAsPassword && errors.push("Şifreniz aynı değil.");
      !this.$v.password2.minLength &&
        errors.push("Şifreniz en az 8 karakter olmalı.");
      return errors;
    },
    submitButtonDisabled() {
      const formErrorsArray = [
        ...this.password1Errors,
        ...this.password2Errors,
        ...this.emailErrors,
        ...this.usernameErrors
      ];
      // console.log(formErrorsArray);
      if (
        !this.$v.username.$dirty ||
        !this.$v.email.$dirty ||
        !this.$v.password1.$dirty ||
        !this.$v.password2.$dirty
      ) {
        return true;
      }
      return formErrorsArray.length > 0;
    }
  }
};
</script>
