<template>
  <v-content class="mb-5">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-flex mb-3 text-xs-center red--text>
            <!-- <div>Login failed, email or password is not correct!</div> -->
            <div v-for="(message, index) in errorMessages" v-bind:key="index">{{message}}</div>
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
                  name="email"
                  label="Email"
                  type="text"
                  v-model="email"
                  :error-messages="emailErrors"
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
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
              <!-- <router-link :to="{ name: 'forgotPassword'}">
                <v-btn color="primary" flat class="text-capitalize">Forgot Password</v-btn>
              </router-link>-->
              <router-link :to="{ name: 'signup'}">
                <v-btn color="primary" text class="text-capitalize">Signup</v-btn>
              </router-link>
              <v-btn
                class="text-capitalize"
                color="primary"
                text
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

import { required, minLength, email } from "vuelidate/lib/validators";
// import theme from "../store/modules/theme";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      backendError: false,
      errorMessages: []
    };
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) }
  },
  methods: {
    login: function() {
      this.$v.$touch();
      if (this.emailErrors.length === 0 && this.passwordErrors.length === 0) {
        const { email, password } = this;
        this.$store
          .dispatch(AUTH_REQUEST, { email, password })
          .then(() => {
            this.$router.push("/account");
          })
          .catch(err => {
            this.errorMessages.push(
              "Can not be logged in with provided credentials. Please check your email or password is correct."
            );
            console.log(this.errorMessages);
          });
      }
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authStatus", "badLogin"]),
    loading: function() {
      return this.authStatus === "loading" && !this.isAuthenticated;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      // !this.$v.name.decimal && errors.push('Name must be a number')
      // !this.$v.usernname.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.email.required && errors.push("Email is required.");
      !this.$v.email.email && errors.push("Please enter an email.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      // !this.$v.name.decimal && errors.push('Name must be a number')
      //   !this.$v.usernname.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.password.required && errors.push("Password is required.");
      !this.$v.password.minLength &&
        errors.push("Password should be 8 characters at least.");
      return errors;
    },
    submitButtonDisabled() {
      const formErrorsArray = [...this.emailErrors, ...this.passwordErrors];
      if (!this.$v.email.$dirty || !this.$v.password.$dirty) {
        return true;
      }
      return formErrorsArray.length > 0;
    }
  }
};
</script>
