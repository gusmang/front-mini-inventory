<template>
  <div>
    <v-container grid-list-xs fluid v-if="pages == 'detail'">
      <v-row no-gutters>

        <v-col sm="12" md="12" class="padnoBorder20">
          <v-col sm="12" md="12">

            <CustomCard>

              <template v-slot:toolbar>
                <div style="width:100%;">

                  <v-btn color="success" small outlined>
                    {{ $store.state.member.member.titlestab }}
                  </v-btn>

                  <div style="float:right;" v-if="$store.state.member.member.indexRank != '2'">
                    <v-btn color="success" small outlined>
                      <download-excel :data="itemsDetailWithIndex">
                        <v-icon>mdi-download</v-icon> Export
                      </download-excel>
                    </v-btn>
                    <v-btn color="success" class="sub-items-tables" small outlined @click="showList()">
                      <v-icon>mdi-chevron-left</v-icon> Back to List
                    </v-btn>
                  </div>

                  <div style="float:right;" v-if="$store.state.member.member.indexRank == '2'">
                    <v-btn color="success" small outlined>
                      <download-excel :data="itemsFormatExpWithIndex2">
                        <v-icon>mdi-download</v-icon> Export
                      </download-excel>
                    </v-btn>
                    <v-btn color="success" class="sub-items-tables" small outlined @click="showList()">
                      <v-icon>mdi-chevron-left</v-icon> Back to List
                    </v-btn>
                  </div>

                </div>

              </template>

              <template v-slot:datatable>

                <v-flex md12 style="overflow-x: scroll">

                  <v-data-table hide-default-footer disable-pagination disable-sort
                    v-if="$store.state.member.member.indexRank != '2'" :headers="headers_detail"
                    :items="itemsDetailWithIndex" :loading="loading" :loading-text="loadingtext">

                    <template v-slot:[`item.index`]="{ item }">
                      <div> {{ item.index }} </div>
                    </template>


                    <!-- <template v-slot:[`item.name`]="{ item }">
                                            <div> <b>  {{ item.name }} </b> <br /> <div> <small>  {{ item.phone }} - {{ item.email }} </small> </div> </div>
                                        </template> -->
                  </v-data-table>

                  <v-data-table hide-default-footer disable-pagination disable-sort
                    v-if="$store.state.member.member.indexRank == '2'" :headers="headersactive"
                    :items="itemsFormatWithIndex2" :loading="loading" :loading-text="loadingtext">

                    <template v-slot:[`item.index`]="{ item }">
                      <div> {{ item.index }} </div>
                    </template>

                    <template v-slot:[`item.name`]="{ item }">
                      <div> <b> {{ item.name }} </b> <br />
                        <div> <small> {{ item.phone }} - {{ item.email }} </small> </div>
                      </div>
                    </template>

                  </v-data-table>

                </v-flex>

              </template>

            </CustomCard>
          </v-col>
        </v-col>

      </v-row>

    </v-container>
    <v-container grid-list-xs fluid v-if="pages == 'list'">
      <v-row no-gutters>

        <v-col sm="6" md="6" class="padnoBorder20">
          <v-col sm="12" md="12">
            <CustomCard>
              <template v-slot:toolbar>
                <div style="width:100%;">

                  <v-btn color="success" small outlined>
                    10 High Balance
                  </v-btn>

                  <div style="float:right;">
                    <v-btn color="success" small outlined @click="fetchDataBalance(1)">
                      More 500 <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </div>

                </div>

              </template>

              <template v-slot:datatable>

                <v-flex md12 style="overflow-x: scroll">

                  <v-data-table hide-default-footer disable-pagination disable-sort :headers="headers"
                    :items="itemsWithIndex" :loading="loading" :loading-text="loadingtext">

                    <template v-slot:[`item.index`]="{ item }">
                      <div> {{ item.index }} </div>
                    </template>

                    <template v-slot:[`item.name`]="{ item }">
                      <div> <b> {{ item.name }} </b> <br />
                        <div> <small> {{ item.phone }} - {{ item.email }} </small> </div>
                      </div>
                    </template>

                  </v-data-table>

                </v-flex>

              </template>
            </CustomCard>
          </v-col>
        </v-col>

        <v-col sm="6" md="6" class="padnoBorder20">
          <v-col sm="12" md="12">
            <CustomCard>
              <template v-slot:toolbar>

                <div style="width:100%;">

                  <v-btn color="success" small outlined>
                    10 Best Active
                  </v-btn>

                  <div style="float:right;">
                    <v-btn color="success" small outlined @click="fetchDataBalance(2)">
                      More 500 <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </div>

                </div>

              </template>

              <template v-slot:datatable>

                <v-flex md12 style="overflow-x: scroll">
                  <v-data-table hide-default-footer disable-pagination disable-sort :headers="headersactive"
                    :items="itemsFormatWithIndex2" :loading="loading" :loading-text="loadingtext">

                    <template v-slot:[`item.index`]="{ item }">
                      <div> {{ item.index }} </div>
                    </template>

                    <template v-slot:[`item.name`]="{ item }">
                      <div> <b> {{ item.name }} </b> <br />
                        <div> <small> {{ item.phone }} - {{ item.email }} </small> </div>
                      </div>
                    </template>

                  </v-data-table>
                </v-flex>

              </template>

            </CustomCard>
          </v-col>
        </v-col>
      </v-row>

      <v-row no-gutters>

        <v-col sm="6" md="6" class="padnoBorder20">
          <v-col sm="12" md="12">
            <CustomCard>
              <template v-slot:toolbar>

                <div style="width:100%;">

                  <v-btn color="success" small outlined>
                    10 Best Buy ({{ monthSel }} 2022)
                  </v-btn>

                  <div style="float:right;">
                    <v-btn color="success" small outlined @click="fetchDataBalance(3)">
                      More 500 <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </div>

                </div>

              </template>

              <template v-slot:datatable>
                <v-flex md12 style="overflow-x: scroll">
                  <v-data-table hide-default-footer disable-pagination disable-sort :headers="headers"
                    :items="itemsWithIndex3" :loading="loading" :loading-text="loadingtext">

                    <template v-slot:[`item.index`]="{ item }">
                      <div> {{ item.index }} </div>
                    </template>


                    <template v-slot:[`item.name`]="{ item }">
                      <div> <b> {{ item.name }} </b> <br />
                        <div> <small> {{ item.phone }} - {{ item.email }} </small> </div>
                      </div>
                    </template>
                  </v-data-table>
                </v-flex>
              </template>
            </CustomCard>
          </v-col>
        </v-col>

        <v-col sm="6" md="6" class="padnoBorder20">
          <v-col sm="12" md="12">
            <CustomCard>

              <template v-slot:toolbar>

                <div style="width:100%;">
                  <v-btn color="success" small outlined>
                    10 Best Sell ({{ monthSel }} 2022)
                  </v-btn>

                  <div style="float:right;">
                    <v-btn color="success" small outlined @click="fetchDataBalance(4)">
                      More 500 <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </div>
                </div>

              </template>

              <template v-slot:datatable>
                <v-flex md12 style="overflow-x: scroll">
                  <v-data-table hide-default-footer disable-pagination disable-sort :headers="headers"
                    :items="itemsWithIndex4" :loading="loading" :loading-text="loadingtext">

                    <template v-slot:[`item.index`]="{ item }">
                      <div> {{ item.index }} </div>
                    </template>

                    <template v-slot:[`item.name`]="{ item }">
                      <div> <b> {{ item.name }} </b> <br />
                        <div> <small> {{ item.phone }} - {{ item.email }} </small> </div>
                      </div>
                    </template>

                  </v-data-table>
                </v-flex>
              </template>
            </CustomCard>
          </v-col>
        </v-col>

      </v-row>

    </v-container>
  </div>
</template>


<script>
//import CustomCard from "../../../../components/CustomCard.vue";
import CustomCard from "../../components/CustomCard.vue";


export default {
  data() {
    return {
      tipe: [],
      menu: null,
      loadingtext: "",
      form: {},
      nowMonth: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Des"],
      monthSel: "",
      pagination: {},
      pages: "list",
      headers: [
        { text: "#", value: "index" },
        { text: "Member", value: "name", align: "left" },
        { text: "Total Bal ( GR )", align: "left", value: "bal_gramasi" }
      ],
      headersactive: [
        { text: "#", value: "index" },
        { text: "Member", value: "name", align: "left" },
        { text: "Active", align: "left", value: "total_active" }

      ],
      headers_detail: [
        { text: "#", value: "index" },
        { text: "Name", value: "name", align: "left" },
        { text: "Email", align: "left", value: "email" },
        { text: "Phone", align: "left", value: "phone" },
        { text: "Total Bal ( GR )", align: "center", width: 120, value: "bal_gramasi" },
        { text: "Reg Date", align: "left", value: "created_at" }
      ],
      loading: false,
      loadingText: "Loading Data...",
    };
  },
  methods: {
    fetchRank(params) {
      this.$store.commit("main/setLoading", true);
      this.loading = true;
      this.loadingtext = 'Loading... Please wait';

      this.$store
        .dispatch("member/fetchRank", {
          find: params,
        })
        .then(() => {
          //this.provinsiList = this.$store.state.wilayah.wilayah.list;
          // console.log("logRank" , this.$store.state.member.member.rankListBal);
          this.$store.commit("main/setLoading", false);
          this.loading = false;
          this.loadingtext = '';
          //this.provinsiList = this.$
        })
        .catch((res) => {
          //console.log("logs" , res.response.data.message);
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res.response.data.message);
          this.loading = false;
          this.loadingtext = '';
        });
    },
    fetchDetailRanks(params) {
      this.$store.commit("main/setLoading", true);
      this.loading = true;
      this.loadingtext = 'Loading... Please wait';

      this.$store
        .dispatch("member/fetchDetailRank", {
          find: params,
        })
        .then(() => {
          this.$store.commit("main/setLoading", false);
          this.loading = false;
          this.loadingtext = '';
          //this.provinsiList = this.$store.state.wilayah.wilayah.list;
          // console.log("logRank" , this.$store.state.member.member.rankListBal);
        })
        .catch((res) => {
          // console.log("logs" , res.response.data.message);
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res.response.data.message);
          this.loading = false;
          this.loadingtext = '';
        });

    },
    exportList(params) {
      this.$store.commit("main/setLoading", true);
      this.loading = true;
      this.loadingtext = 'Loading... Please wait';

      this.$store
        .dispatch("member/exportHighBuy", {
          find: params,
        })
        .then(() => {
          this.$store.commit("main/setLoading", false);
          this.loading = false;
          this.loadingtext = '';
          //this.provinsiList = this.$store.state.wilayah.wilayah.list;
          // console.log("logRank" , this.$store.state.member.member.rankListBal);
        })
        .catch((res) => {
          // console.log("logs" , res.response.data.message);
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res.response.data.message);
          this.loading = false;
          this.loadingtext = '';
        });
    },
    fetchDataBalance(param) {
      this.fetchDetailRanks(param);
      this.pages = "detail";
      //this.$store.commit("member/setMemberPage", "detail");
    },
    showList() {
      this.pages = "list";
      //this.$store.commit("member/setMemberPage", "list");
    },
    fetchDataAllBalance(params) {
      this.$store
        .dispatch("member/fetchAllRank", {
          find: params,
        })
        .then(() => {
          //this.provinsiList = this.$store.state.wilayah.wilayah.list;
          // console.log("logRank" , this.$store.state.member.member.rankListBal);
        })
        .catch((res) => {
          console.log("prov", res.response.data.message);
        });
    }
  },
  mounted() {
    //alert(this.$store.state.member.member.page);
    //this.$store.state.member.member.page = "list";
    this.fetchRank("");

    let dates = new Date();
    //alert(dates.getMonth());
    //alert(this.nowMonth[dates.getMonth()]);
    this.monthSel = this.nowMonth[dates.getMonth()];

  },
  computed: {
    dateRangeText() {
      if (typeof this.form.dates != "undefined") {
        if (this.form.dates.length > 1) {
          return this.form.dates.join(" ~ ");
        } else {
          return this.form.dates[0];
        }
      } else {
        return null;
      }
    },
    itemsWithIndex() {
      return this.$store.state.member.member.rankListBal.map(
        (items, index) => ({
          ...items,
          index: index + 1,
          bal_gramasi: parseFloat(items.gramasi).toFixed(2)
        }))
    },
    itemsDetailWithIndex() {
      return this.$store.state.member.member.rankListDetailBal.map(
        (items, index) => ({
          ...items,
          index: index + 1,
          bal_gramasi: parseFloat(items.gramasi).toFixed(2)
        }))
    },
    itemsFormatDetailWithIndex() {
      return this.$store.state.member.member.rankListDetailBal.map(
        (items, index) => ({
          index: index + 1,
          name: items.name,
          email: items.email,
          phone: items.phone,
          bal_gramasi: parseFloat(items.gramasi).toFixed(2),
          created_at: items.created_at
        }))
    },
    itemsFormatWithIndex2() {
      return this.$store.state.member.member.rankListAct.map(
        (items, index) => ({
          index: index + 1,
          name: items.name,
          email: items.email,
          phone: items.phone,
          total_active: items.total
        }))
    },
    itemsFormatExpWithIndex2() {
      return this.$store.state.member.member.rankListAct.map(
        (items, index) => ({
          index: index + 1,
          name: items.name,
          email: items.email,
          phone: items.phone,
          total_active: items.total
        }))
    },
    itemsWithIndex3() {
      return this.$store.state.member.member.rankListBuy.map(
        (items, index) => ({
          ...items,
          index: index + 1,
          bal_gramasi: parseFloat(items.gramasi).toFixed(2)
        }))
    },
    itemsWithIndex4() {
      return this.$store.state.member.member.rankListSell.map(
        (items, index) => ({
          ...items,
          index: index + 1,
          bal_gramasi: parseFloat(items.gramasi).toFixed(2)
        }))
    },
  },
  components: { CustomCard },
};
</script>

<style>

</style>