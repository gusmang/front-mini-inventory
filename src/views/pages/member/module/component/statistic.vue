<template>
  <v-container grid-list-xs fluid>
    <v-layout row wrap>
      <v-flex>
        <statistic-card
          :data="$store.state.member.member.totaluserreg"
          :title="'Total User'"
        ></statistic-card>
      </v-flex>
      <v-flex>
        <statistic-card
          :data="$store.state.member.member.totaluseractive"
          :title="'Verified User'"
        ></statistic-card>
      </v-flex>
      <v-flex>
        <statistic-card
          :data="$store.state.member.member.totaluseractive"
          :title="'Active User'"
        ></statistic-card>
      </v-flex>
      <v-flex> </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import StatisticCard from "../../../../../components/StatisticCard.vue";
export default {
  components: {
    StatisticCard,
  },
  mounted() {
    this.$store.dispatch("member/fetchtotals");
  },
};
</script>

<style>
</style>