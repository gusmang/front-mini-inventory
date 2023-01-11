<template>
  <div>
    <v-app>
      <sidebar />
      <navbar />
      <v-main>
        <v-layout row class="align-center layout px-4 pt-4 app--page-header">
          <div class="page-header-left ml5">
            <h3 class="pl-3 pt-3" style="text-transform: uppercase">
              {{ $route.name || "" }}
            </h3>
          </div>
        </v-layout>
        <router-view class="mt-5"></router-view>
      </v-main>
      <footbar />
      <v-overlay :value="$store.state.main.loading">
        <lottie-animation path="loading.json" />
      </v-overlay>
    </v-app>
  </div>
</template>

<script>
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
import Sidebar from "./layout/sidebar.vue";
import Navbar from "./layout/navbar.vue";
import Footbar from "./layout/footbar.vue";

export default {
  components: {
    LottieAnimation,
    Sidebar,
    Navbar,
    Footbar,
  },
};
</script>
