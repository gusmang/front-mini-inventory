<template>
  <div>
    <!-- <v-btn color="success" @click="fetch">Add New MemberS New Baru</v-btn> -->

    <v-container>

      <v-row no-gutters>

        <v-col sm="3" md="3" style="margin-bottom:10px;">
          <v-col sm="12" md="12">
            <v-card elevation="2" style="border-top: 3px solid #17a2b8;">
              <v-col cols="12" sm="12" md="12" class="text-center">
                <h5 style="font-size:28px; color:#888;"> {{ jmltranslist.supplier }} </h5>
                <div> <small style="font-size:12px;"> Total Supplier </small> </div>
              </v-col>
            </v-card>
          </v-col>
        </v-col>

        <v-col sm="3" md="3" style="margin-bottom:10px;">
          <v-col sm="12" md="12">
            <v-card elevation="2" style="border-top: 3px solid #17a2b8;">
              <v-col cols="12" sm="12" md="12" class="text-center">
                <h5 style="font-size:28px; color:#888;"> {{ jmltranslist.produk }} </h5>
                <small style="font-size:12px;"> Total Barang </small>
              </v-col>
            </v-card>
          </v-col>
        </v-col>

        <v-col sm="3" md="3" style="margin-bottom:10px; position:relative;">
          <v-col sm="12" md="12">

            <v-card elevation="2" style="border-top: 3px solid #17a2b8;">
              <v-col cols="12" sm="12" md="12" class="text-center">
                <h5 style="font-size:28px; color:#888;"> {{ jmltranslist.pembelian }} </h5>
                <small style="font-size:12px;"> Total Trx Pembelian </small>
              </v-col>
            </v-card>
          </v-col>
        </v-col>

        <v-col sm="3" md="3" style="margin-bottom:10px; position:relative;">
          <v-col sm="12" md="12">
            <v-card elevation="2" style="border-top: 3px solid #B59410;">

              <v-col cols="12" sm="12" md="12" class="text-center">
                <h5 style="font-size:28px; color:rgb(181, 148, 16);"> {{ jmltranslist.penjualan }} </h5>
                <small style="font-size:12px;"> Total Trx Penjualan </small>
              </v-col>
            </v-card>
          </v-col>
        </v-col>

      </v-row>

      <v-col sm="12" md="12">

        <template>
          <div class="chart">

            <!-- <Chart 
                      :chartData="chartData" 
                      :chartOptions="chartOptions" 
                      :chartType="chartType" /> -->
            <!-- <Bar
                          :chart-options="chartOptions"
                          :chart-data="chartData"
                          :chart-id="chartId"
                          :dataset-id-key="datasetIdKey"
                          :plugins="plugins"
                          :css-classes="cssClasses"
                          :styles="styles"
                          :width="width"
                          :height="height"
                      /> -->
            <!-- <LineChart /> -->

            <p></p>
            <center>
              <h3> Grafik Transaksi Jual - Beli </h3>
              Tahun {{ yearNow }}
            </center>

            <v-row style="margin-top:10px;">

              <v-col sm="4" md="4">

                <v-text-field v-model="searchForm.tahunCari" type="number" label="Filter Tahun" small clearable>
                </v-text-field>

              </v-col>

              <v-col sm="4" md="4">

                <v-select style="margin-top:22px;" :items="itemsTypes" label="Chart Types" single-line dense
                  v-model="searchForm.chartTypes" @change="changeTypes()"></v-select>

              </v-col>

              <v-col sm="2" md="2">

                <v-btn elevation="2" color="primary" style="margin-top:12px;" @click="fetch()">
                  <v-icon>mdi-magnify</v-icon> Search
                </v-btn>

              </v-col>

              <v-col sm="2" md="2">

                <v-btn elevation="2" color="red" style="margin-top:12px; color:#ffffff;"
                  @click="exportPdf('BarTransaksiChart', 'BarTransaksiChart.pdf')">
                  <v-icon>mdi-download</v-icon> Export Pdf
                </v-btn>

              </v-col>

            </v-row>

            <p></p>

            <apexchart id="BarTransaksiChart" width="100%" height="500" :type="typechart" :options="chartOptions3"
              :series="series3">
            </apexchart>

          </div>
        </template>

      </v-col>

    </v-container>


  </div>
</template>

<script>
import Exporter from "vue-chartjs-exporter";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


export default {
  name: 'BarChart',
  components: {
    //Bar,
    // ApexCharts,
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => { }
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      modal: false,
      panel: null,
      name: 'BarChart',
      yearNow: "",
      profiles: this.$store.state.auth.profile,
      jmltranslist: [],
      provinsiList: [],
      typechart: "bar",

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      chartOptions3: null,
      series3: null,
      chartData: {},
      currentPage: 1,
      decimals: "10.00",
      icons: "chevron-right",
      itemsTypes: [
        { text: "Bar", value: "bar" },
        { text: "Area", value: "area" },
        { text: "Line", value: "line" }
      ],
      status: [
        { text: "All Status", value: "" },
        { text: "Email Verified", value: "email_verified" },
        { text: "Email Not Verified", value: "email_not_verified" },
        { text: "User Verified", value: "user_verified" },
        { text: "User Not Verified", value: "user_not_verified" },
        { text: "User Suspend", value: "user_suspend" }
      ],
      searchForm: {
        member: '',
        tahunCari: ''
      },
      formLock: {

      },
      tipe: [],
      menu: null,
      form: {},
      pagination: {},

      loading: false,
      loadingText: "Loading Data...",
    };
  },
  methods: {
    renderLineChart: function () {
      this.renderChart(
        {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July'
          ],
          datasets: [
            {
              label: 'Buy Rate',
              backgroundColor: '#f87979',
              data: [1750, 1200, 1500, 1850, 1250, 2200, 1800]
            },
            {
              label: 'Sell Rate',
              backgroundColor: '#FFFF00',
              data: [750, 1400, 2500, 1150, 1850, 1200, 800]
            }
          ]
        },
        { responsive: true, maintainAspectRatio: false }
      );
    },
    changeTypes() {
      this.typechart = this.searchForm.chartTypes
    },
    exportPdf(idfile, namafile) {
      //this.fetch(0 , this.searchForm.yearsDate);
      let bar = document.getElementById(idfile);

      //const exp = new Exporter([line, bar, radar, pie, area]);
      const exp = new Exporter([bar]);
      exp.export_pdf().then((pdf) => pdf.save(namafile));
    },
    fetch() {

      this.$store.commit("main/setLoading", true);
      this.loading = true;
      this.loadingtext = 'Loading... Please wait';
      //alert("limits "+this.pagination.itemsPerPage);
      //alert("tes new");
      this.$store
        .dispatch("main/apiHitDataTransChart", {
          year: this.searchForm.tahunCari,
          find: "search"
        })
        .then(() => {
          this.$store.commit("main/setLoading", false);
          this.loading = false;
          this.loadingtext = '';

          this.yearNow = this.searchForm.tahunCari;

          this.jmltranslist = this.$store.state.main.dashboard.list;
          console.log(this.$store.state.main.dashboard.list);

          this.chartOptions3 = {
            chart: {
              id: 'vuechart-example'
            },
            xaxis: {
              categories: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'Agustus',
                'September',
                'Oktober',
                'November',
                'Desember'
              ]
            },
            yaxis: {
              labels: {
                formatter: function (value) {
                  let strvals = value.toString().replace(/[.]/, ',')
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                  return strvals;
                }
              },
            },
          }

          this.series3 = [{
            name: 'Trx Beli',
            data: this.$store.state.main.dashboard.transaksibuy
          },
          {
            name: 'Trx Jual',
            data: this.$store.state.main.dashboard.transaksisell
          }]

        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res.response.data.message);
          this.loading = false;
          this.loadingtext = '';
        });

    },
  },
  mounted() {
    this.fetch();
    this.searchForm.chartTypes = 'bar'

    var dt = new Date();

    if (this.searchForm.year_registrasi == null || this.searchForm.year_registrasi == "") {
      this.searchForm.tahunCari = dt.getFullYear();
    }

    this.yearNow = dt.getFullYear();

    //   let {chartType,chartData,chartOptions} = this;
    //   this.chartConstructor(chartType, chartData, chartOptions);
    //this.jmltranslist = this.$store.state.transaction.member.transaksi;
    // console.log("translist" , "tesbaca" + this.$store.state.transaction.member.transaksi);
  },
  watch: {

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
  },

};
</script>

<style>

</style>