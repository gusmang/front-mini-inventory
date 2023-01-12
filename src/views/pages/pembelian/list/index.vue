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
                <v-card-text>Are you sure want to delete pembelian ?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialogDel = false;">
                        Close
                    </v-btn>
                    <v-btn color="green darken-1" text @click="delCat(selectedId)">
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
                <v-btn color="success" small outlined style="margin-left: 20px" @click="showAdd()">
                    <v-icon>mdi-download</v-icon> Export Data
                </v-btn>

            </template>

            <template v-slot:expansion>
                <v-expansion-panels v-model="panel" multiple>
                    <v-expansion-panel expand focusable>
                        <v-expansion-panel-content>
                            <v-layout>
                                <v-flex>
                                    <v-text-field v-model="$store.state.kategori.searchForm.name"
                                        label="Search By Name / Email / Address / Telepon" single-line small clearable
                                        @keyup.13="fetch(1)">
                                    </v-text-field>
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
                    <v-data-table :headers="headers" :items="listKategori" :options.sync="pagination"
                        :server-items-length="$store.state.pembelian.attributes.total" :footer-props="{
                            'items-per-page-options': [10, 25, 50, 100],
                            'items-per-page-text': 'Baris per Halaman:',
                        }" :items-per-page="10" :loading="loading" :loading-text="loadingtext">

                        <template v-slot:[`item.action`]="{ item }">

                            <v-btn color="info" icon v-bind="attrs" v-on="on" @click="findKategori(item)">
                                <v-icon small>mdi-eye</v-icon>
                            </v-btn>

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
import ModalForm from "../dialog/addSupplier.vue";
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
            noAwal: 0,
            headers: [
                { text: "ID Pembelian", value: "id" },
                { text: "Nama Supplier", value: "supplier.nama" },
                { text: "Total Item", value: "total_item" },
                { text: "Total Bayar", value: "formatted_total_bayar" },
                { text: "Diskon", value: "diskon" },
                { text: "Tanggal Pembelian", value: "formatted_date" },
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
                .dispatch("pembelian/fetchList", {
                    page: this.pagination.page,
                    itemsPerPage: this.pagination.itemsPerPage,
                    name: this.$store.state.kategori.searchForm.name
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
        delCat(index) {
            this.$store.commit("main/setLoading", true);
            this.loading = true;
            this.loadingtext = "Loading... Please wait";

            this.$store
                .dispatch("supplier/delete", {
                    id: index,
                })
                .then(() => {
                    this.$store.commit("main/setLoading", false);
                    this.loading = false;
                    this.loadingtext = "";

                    this.fetch(0);
                    this.dialogDel = false;
                    this.$store.commit("main/setSnackbarSuccess", "delete success");
                })
                .catch((res) => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res.response.data.message);
                    this.loading = false;
                    this.loadingtext = "";
                });
        },
        findKategori(item) {
            this.$store.state.supplier.editForm.id = item.id
            this.$store.state.supplier.editForm.name = item.nama;
            this.$store.state.supplier.editForm.email = item.email;
            this.$store.state.supplier.editForm.alamat = item.alamat;
            this.$store.state.supplier.editForm.telepon = item.telepon;
        },
        showAdd() {
            this.$store.state.kategori.attributes.dialogAdd = true;
            this.$store.state.kategori.addForm.name = "";
        },
        edit(dlg) {
            this.$store.commit("main/setLoading", true);
            this.loading = true;
            this.loadingtext = "Loading... Please wait";

            //alert("limits "+this.pagination.itemsPerPage);

            this.$store
                .dispatch("supplier/update", {
                    id: this.$store.state.supplier.editForm.id,
                    nama: this.$store.state.supplier.editForm.name,
                    email: this.$store.state.supplier.editForm.email,
                    alamat: this.$store.state.supplier.editForm.alamat,
                    telepon: this.$store.state.supplier.editForm.telepon,
                })
                .then(() => {
                    this.$store.commit("main/setLoading", false);
                    this.loading = false;
                    this.loadingtext = "";

                    this.fetch(0);
                    this.$store.commit("main/setSnackbarSuccess", "Success");

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
        this.noAwal = (this.pagination.page - 1) * this.pagination.itemsPerPage;
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
        listKategori() {
            return this.$store.state.pembelian.attributes.list.map(
                (items, index) => ({
                    ...items,
                    no: index + 1,
                    num: index + ((this.pagination.page - 1) * this.pagination.itemsPerPage) + 1
                })
            )
        },
    },
    components: { CustomCard, ModalForm }
};
</script>

<style>

</style>