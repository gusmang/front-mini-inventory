<template>
  <v-app>
    <router-view />
    <v-snackbar
      v-model="$store.state.main.snackbar.fail"
      color="error"
      :timeout="timeout"
      top
    >
      {{ $store.state.main.snackbar.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click="$store.commit('main/setSnackbarFail')"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
      v-model="$store.state.main.snackbar.success"
      color="success"
      :timeout="timeout"
      top
    >
      {{ $store.state.main.snackbar.message }}
      <template v-slot:actions="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click="$store.commit('main/setSnackbarSuccess')"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-overlay :value="$store.state.main.loading">
      <lottie-animation path="src/assets/loading.json" />
    </v-overlay>
  </v-app>
</template>

<script>
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";

export default {
  name: "App",

  data: () => ({
    timeout: 3000,
  }),
  components: {
    LottieAnimation
  }
};
</script>
