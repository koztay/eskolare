<template>
  <v-container fluid fill-height>
    <!-- <v-layout align-center justify-center>
      <v-flex>
        <div class="headline">
          <div>
            <h1>User Profile</h1>
          </div>
          <h2>Basic Information</h2>
          <p v-if="profile">
            <img class="avatar" :src="profile.avatar" />
          </p>
          <p>
            <strong>Email:</strong>
            {{profile.email}}
          </p>
          <p>
            <strong>Username:</strong>
            {{ profile.username }}
          </p>
          <p>
            <strong>User ID:</strong>
            {{ profile.pk }}
          </p>
          <h2>Roles</h2>
          <div>
            <div
              size="medium"
              :disable-transitions="true"
              v-if="profile.is_superuser"
              type="success"
            >Super User</div>
            <div
              size="medium"
              :disable-transitions="true"
              v-if="profile.is_staff"
              type="warning"
            >Staff</div>
            <div
              size="medium"
              :disable-transitions="true"
              v-if="profile.is_active"
              type="info"
            >Active</div>
          </div>
          <h3>About Roles</h3>
          <ul>
            <li>
              <b>Super Users</b> have full permissions
            </li>
            <li>
              <b>Staff Users</b> can access the admin
              interfaces and can be granted specific per model permissions
            </li>
            <li>
              <b>Active Users</b> active users can authenticate,
              but do not have access to the Django Admin interface
            </li>
          </ul>
        </div>
      </v-flex>
    </v-layout>-->
    <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">OVERLINE</div>
          <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
          <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn text>Button</v-btn>
        <v-btn text>Button</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
/* eslint-disable max-len */
import { mapState } from "vuex";

export default {
  name: "account",
  computed: mapState({ profile: state => state.user.profile }),
  mounted() {
    if (!this.profile) {
      this.$store.dispatch("USER_REQUEST");
    }
  }
};
</script>

<style lang="scss" scoped>
.headline {
  width: 90%;
}
.el-tag {
  margin-right: 5px;
}

.avatar {
  border-radius: 50%;
  height: 75px;
  background-color: beige;
}
</style>
