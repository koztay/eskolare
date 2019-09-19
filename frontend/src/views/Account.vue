<template>
  <v-container fluid fill-height>
    <v-card class="mx-auto mb-5" width="80%" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">USER DETAILS</div>
          <v-list-item-title class="headline mb-1">{{ profile.username }}</v-list-item-title>
          <v-list-item-subtitle>{{profile.email}}</v-list-item-subtitle>
          <v-list-item-title class="headline mb-1 mt-2">Roles</v-list-item-title>
          <v-list-item-subtitle v-if="profile.is_staff">- User is Staff Member</v-list-item-subtitle>
          <v-list-item-subtitle v-if="profile.is_superuser">- User is Superuser</v-list-item-subtitle>
          <v-list-item-subtitle
            v-if="!profile.is_superuser&&!profile.is_staff"
          >- User is Standard User</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
      </v-list-item>
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
