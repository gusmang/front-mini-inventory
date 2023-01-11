<template>
  <div>
    <v-container grid-list-xs fluid>
      <List v-if="$store.state.member.member.page == 'list'"></List>
    </v-container>
  </div>
</template>

<script>
import List from "./module/list.vue";
export default {
  data() {
    return {
      pages: "list",
    };
  },
  mounted() {

  },
  components: { List },
};
</script>

<style>

</style>