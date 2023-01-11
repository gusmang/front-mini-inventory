<template>
  <div>
    <v-app-bar app color="#222222" dark elevation="0">
      <v-app-bar-nav-icon @click.stop="$store.commit('main/setDrawer')"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <!-- {{ date + " " + time }} -->
      <v-btn text class="profileStyle pa-1">
      </v-btn>
      <v-btn text @click="logout">

      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('user/getProfile');
  },
  methods: {
    logout() {
      alert("logout");
      this.$store.dispatch('auth/logout');
    }
  },
}
</script>

<style>
.profileStyle {
  text-transform: inherit;
}
</style>