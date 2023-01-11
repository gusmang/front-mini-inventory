<template>
  <div>
    <statistic />
    <CustomCard>
      <template v-slot:toolbar>
        <v-btn color="warning" outlined small @click="refreshData()">
          <v-icon small>mdi-refresh</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" small @click="togglePanel()" depressed>
          <v-icon class="mr-2">mdi-chevron-down</v-icon> Filter
        </v-btn>
        <v-btn color="info" small class="ml-3" depressed>
          <v-icon small class="mr-2"> mdi-file-excel </v-icon> download
        </v-btn>
      </template>
      <template v-slot:expansion>
        <search-component :panel="toggle" />
      </template>
      <template v-slot:datatable>
        <table-data />
      </template>
    </CustomCard>
    <lock-balance />
  </div>
</template>

<script>
import CustomCard from "../../../../components/CustomCard.vue";
import Statistic from "./component/statistic.vue";
import SearchComponent from "./component/search.vue";
import TableData from "./component/tableData.vue";
import LockBalance from "./dialog/lockBalance.vue";

export default {
  components: {
    CustomCard,
    Statistic,
    SearchComponent,
    TableData,
    LockBalance,
  },
  data() {
    return {
      toggle: null,
    };
  },
  methods: {
    togglePanel() {
      if (this.toggle == null)
        this.toggle = [...Array(this.items).keys()].map((k, i) => i);
      else this.toggle = null;
    },
    refreshData() {
      this.$store.commit("main/setLoading", true);
      this.$store
        .dispatch("memberMain/fetchMainList")
        .then(() => {
          this.$store.commit("main/setLoading", false);
        })
        .catch((res) =>
          this.$store.commit("main/setSnackbarFail", res.response.data.message)
        );
    },
  },
};
</script>