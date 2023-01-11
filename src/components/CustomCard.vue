<template>
  <div>
    <v-card :style="'border-top: 3px solid ' + color">
      <v-toolbar color="#f5f5f5" dense flat>
        <slot name="toolbar" />
      </v-toolbar>

      <slot name="expansion" />
      <slot name="datatable" />
      <v-card-text v-if="cardShow">
        <slot name="content" />
      </v-card-text>
      <v-card-actions v-if="cardAction">
        <slot name="action" />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "#333333",
    },
    cardShow: {
      type: Boolean,
      default: false,
    },
    cardAction: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>

</style>