<template>
  <div>
    <v-card class="ma-3">
      <v-card elevation="2" :style="'border-top: 3px solid ' + color">
        <v-col cols="12" sm="12" md="12" class="text-center">
          <v-icon medium color="green" v-if="iconShow"> {{ icon }} </v-icon>
          <!-- <v-icon>mdi-account-card-details</v-icon> -->
          <h5 style="font-size: 28px; color: #888">
            {{ data }}
          </h5>
          <small> {{ title }} </small>
        </v-col>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "#28a745",
    },
    icon: {
      type: String,
      default: "mdi-account",
    },
    iconShow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "title",
    },
    data: {
      type: String,
      default: "0",
    },
  },
};
</script>

<style>
</style>