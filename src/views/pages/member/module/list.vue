<template>
  <div>
    <v-container class="no-pad-left">

    </v-container>

    <ModalForm></ModalForm>


    <v-dialog v-model="dialogDel" max-width="390">

      <v-card>
        <v-card-title class="text-h5">
          Confirm Delete ?
        </v-card-title>
        <v-card-text>Are you sure want to delete member ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialogDel = false;">
            Close
          </v-btn>
          <v-btn color="green darken-1" text @click="delMember(selectedId)">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <CustomCard>
      <template v-slot:toolbar>
        <div style="width: 100%">
          <v-btn color="success" small outlined @click="filterToggle" style="float: left">
            filter <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
          <v-btn color="success" small outlined @click="fetch(pagination.page)" style="float: right">
            <v-icon>mdi-refresh</v-icon> Refresh
          </v-btn>
        </div>
        <v-btn color="success" small outlined style="margin-left: 20px" @click="showAddMember()">
          <v-icon>mdi-plus</v-icon> Tambah Data
        </v-btn>

      </template>

      <template v-slot:expansion>
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel expand focusable>
            <v-expansion-panel-content>
              <v-layout>
                <v-flex>
                  <v-text-field v-model="searchForm.member" label="Search By Email / Nama" single-line small clearable
                    @keyup.13="fetch(1)">
                  </v-text-field>
                </v-flex>
                <v-flex>
                  <v-autocomplete v-model="searchForm.statusList" :items="$store.state.member.member.statusList"
                    item-text="text" item-value="value" label="Status">
                  </v-autocomplete>
                </v-flex>
              </v-layout>
              <v-layout>
              </v-layout>

              <v-layout align-end justify-end>
                <v-spacer></v-spacer>
                <v-btn small depressed color="success" class="m0" @click="fetch(1)">
                  <v-icon>mdi-magnify</v-icon> Search
                </v-btn>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>

      <template v-slot:datatable>
        <v-flex md12 style="overflow-x: scroll">
          <v-data-table :headers="headers" :items="$store.state.member.member.list" :options.sync="pagination"
            :server-items-length="$store.state.member.member.total" :footer-props="{
  'items-per-page-options': [10, 25, 50, 100],
  'items-per-page-text': 'Baris per Halaman:',
}" :items-per-page="10" :loading="loading" :loading-text="loadingtext">

            <template v-slot:[`item.action`]="{ item }">
              <v-dialog transition="dialog-top-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="info" icon v-bind="attrs" v-on="on" @click="findMember(item)">
                    <v-icon small>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <template v-slot:default="dialog">
                  <v-card>
                    <v-toolbar color="success" dark>Edit Data Member</v-toolbar>

                    <v-text-field v-model="form.userId" hidden label="">
                    </v-text-field>

                    <v-container>
                      <v-layout>
                        <v-flex>
                          <v-text-field v-model="form.editNama" label="Nama Lengkap">
                          </v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-layout>
                        <v-flex>
                          <v-text-field v-model="form.editEmail" label="Email" value="0" type="email">
                          </v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-layout>
                        <v-flex>
                          <v-text-field v-model="form.editPassword" label="Password" value="0" type="password">
                          </v-text-field>
                        </v-flex>
                      </v-layout>


                      <v-layout>
                        <v-flex>
                          <v-text-field v-model="form.editKota" label="Kota" value="0">
                          </v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-layout>
                        <v-flex>
                          <v-autocomplete v-model="form.editStatus" :items="$store.state.member.member.statusList"
                            item-text="text" item-value="value" label="Status">
                          </v-autocomplete>
                        </v-flex>
                      </v-layout>


                    </v-container>

                    <v-card-actions class="justify-end">
                      <v-btn text @click="dialog.value = false">Close</v-btn>
                      <v-btn color="success" @click="edit(dialog)">Submit</v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>

              <v-btn color="success" icon @click="showDialogDel(item)">
                <v-icon small>mdi-delete</v-icon>
              </v-btn>

            </template>

          </v-data-table>
        </v-flex>
      </template>
    </CustomCard>
  </div>
</template>

<script>
import CustomCard from "../../../../components/CustomCard.vue";
import ModalForm from "./dialog/addMember.vue";
//import downloadexcel from "vue-json-excel";

export default {
  data() {
    return {
      modal: false,
      panel: null,
      currentPage: 1,
      selectedIndex: "",
      dialogDel: false,
      selectedId: 0,
      loadingtext: "",
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dialog: false,
      icons: "chevron-right",
      searchForm: {
        member: "",
        // tipe: 'ALL',
        // status: 'ALL',
        // sponsor: ''
      },
      form: {

      },
      formLock: {

      },
      menu: null,
      pagination: {},
      headers: [
        { text: "Email", value: "email" },
        { text: "Nama Lengkap", value: "nama_lengkap" },
        { text: "Hash Password", value: "password" },
        { text: "Kota", value: "kota" },
        { text: "Status", value: "status" },
        { text: "Action", align: "left", value: "action", width: "170" },
      ],
      loading: false,
      loadingText: "Loading Data...",
    };
  },
  methods: {
    fetch(cari) {
      if (cari == 1) {
        this.pagination.page = 1;
      }
      this.$store.commit("main/setLoading", true);
      this.loading = true;
      this.loadingtext = "Loading... Please wait";

      this.$store
        .dispatch("member/fetchListMember", {
          page: this.pagination.page,
          itemsPerPage: this.pagination.itemsPerPage,
          member: this.searchForm.member,
          statusList: this.searchForm.statusList,
        })
        .then(() => {
          this.$store.commit("main/setLoading", false);
          this.loading = false;
          this.loadingtext = "";
        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res.response.data.message);
          this.loading = false;
          this.loadingtext = "";
        });
    },
    showDialogDel(item) {
      this.selectedId = item.id;
      this.dialogDel = true;
    },
    delMember(index) {
      this.$store.commit("main/setLoading", true);
      this.loading = true;
      this.loadingtext = "Loading... Please wait";

      this.$store
        .dispatch("member/apidelMember", {
          id: index,
        })
        .then(() => {
          this.$store.commit("main/setLoading", false);
          this.loading = false;
          this.loadingtext = "";

          this.fetch(0);
          this.dialogDel = false;
          this.$store.commit("main/setSnackbarSuccess", this.$store.state.member.member.messageInp);
        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res.response.data.message);
          this.loading = false;
          this.loadingtext = "";
        });
    },
    findMember(item) {
      this.form.addPassword = "";

      this.form.userId = item.id
      this.form.editNama = item.nama_lengkap
      this.form.editEmail = item.email
      this.form.editStatus = item.status_index
      this.form.editKota = item.kota
    },
    showAddMember(item) {
      this.$store.state.member.member.dialogAdd = true;
      this.$store.state.member.member.DetailMember = item;
    },
    edit(dlg) {
      this.$store.commit("main/setLoading", true);
      this.loading = true;
      this.loadingtext = "Loading... Please wait";

      //alert("limits "+this.pagination.itemsPerPage);

      this.$store
        .dispatch("member/editMember", {
          id: this.form.userId,
          nama_lengkap: this.form.editNama,
          password: this.form.editPassword,
          email: this.form.editEmail,
          status: this.form.editStatus,
          kota: this.form.editKota,
        })
        .then(() => {
          this.$store.commit("main/setLoading", false);
          this.loading = false;
          this.loadingtext = "";

          this.fetch(0);
          this.$store.commit("main/setSnackbarSuccess", this.$store.state.member.member.messageInp);

          dlg.value = false;
        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res.response.data.message);
          this.loading = false;
          this.loadingtext = "";
        });
    },
    filterToggle() {
      if (this.panel == null)
        this.panel = [...Array(this.items).keys()].map((k, i) => i);
      else this.panel = null;
    },
  },
  mounted() {

  },
  watch: {
    pagination() {
      //alert(this.$store.state.member.member.is_back);
      if (this.$store.state.member.member.is_back != 1) {
        this.loading = true;
        this.loadingtext = "Loading... Please wait";

        this.fetch(0);
      }

      if (this.$store.state.member.member.is_back == 1) {
        this.pagination.page = this.$store.state.member.member.paging_page;
      }

      //this.fetch(1);

    },
  },

  computed: {

  },
  //components: { CustomCard , downloadexcel },
  components: { CustomCard, ModalForm },
};
</script>

<style>

</style>