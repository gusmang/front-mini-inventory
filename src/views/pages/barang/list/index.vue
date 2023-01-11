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
                <v-card-text>Are you sure want to delete Barang ?</v-card-text>
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
                    <v-icon>mdi-plus</v-icon> Tambah Data
                </v-btn>

            </template>

            <template v-slot:expansion>
                <v-expansion-panels v-model="panel" multiple>
                    <v-expansion-panel expand focusable>
                        <v-expansion-panel-content>
                            <v-layout>
                                <v-flex>
                                    <v-text-field v-model="$store.state.barang.searchForm.name"
                                        label="Search By Nama Produk" single-line small clearable @keyup.13="fetch(1)">
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
                    <v-data-table :headers="headers" :items="listBarang" :options.sync="pagination"
                        :server-items-length="$store.state.barang.attributes.total" :footer-props="{
                            'items-per-page-options': [10, 25, 50, 100],
                            'items-per-page-text': 'Baris per Halaman:',
                        }" :items-per-page="10" :loading="loading" :loading-text="loadingtext">

                        <template v-slot:[`item.foto`]="{ item }">
                            <img :src="item.foto_produk"
                                style="height:80px; padding:10px; object-fit:contain!important;" />
                        </template>

                        <template v-slot:[`item.produk`]="{ item }">
                            <div><b>{{ item.nama_produk }}</b></div>
                            <div><small>{{ item.kode_produk }}</small></div>
                        </template>
                        <template v-slot:[`item.action`]="{ item }">
                            <v-dialog transition="dialog-top-transition" max-width="600">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="info" icon v-bind="attrs" v-on="on" @click="findKategori(item)">
                                        <v-icon small>mdi-pencil</v-icon>
                                    </v-btn>
                                </template>
                                <template v-slot:default="dialog">
                                    <v-card>
                                        <v-toolbar color="success" dark>Edit Data Kategori</v-toolbar>

                                        <v-text-field v-model="$store.state.barang.editForm.id" hidden label="">
                                        </v-text-field>

                                        <v-container>
                                            <v-layout>
                                                <v-flex>
                                                    <v-text-field v-model="$store.state.barang.editForm.kode"
                                                        label="Kode Produk">
                                                    </v-text-field>
                                                </v-flex>
                                            </v-layout>

                                            <v-layout>
                                                <v-flex>
                                                    <v-text-field v-model="$store.state.barang.editForm.name"
                                                        label="Nama Produk">
                                                    </v-text-field>
                                                </v-flex>
                                            </v-layout>

                                            <v-layout>
                                                <v-flex>
                                                    <v-autocomplete v-model="$store.state.barang.editForm.kategori"
                                                        :items="$store.state.kategori.attributes.alllist"
                                                        item-text="nama_kategori" item-value="id"
                                                        label="Kategori Produk">
                                                    </v-autocomplete>
                                                </v-flex>
                                            </v-layout>

                                            <v-layout>
                                                <v-flex>
                                                    <v-text-field type="number" step="any" min="0"
                                                        v-model="$store.state.barang.editForm.hargabeli"
                                                        label="Harga Beli">
                                                    </v-text-field>
                                                </v-flex>
                                            </v-layout>

                                            <v-layout>
                                                <v-flex>
                                                    <v-text-field type="number" step="any" min="0"
                                                        v-model="$store.state.barang.editForm.hargajual"
                                                        label="Harga Jual">
                                                    </v-text-field>
                                                </v-flex>
                                            </v-layout>

                                            <v-layout>
                                                <v-flex>
                                                    <v-text-field type="number"
                                                        v-model="$store.state.barang.editForm.stok" label="Stok">
                                                    </v-text-field>
                                                </v-flex>
                                            </v-layout>

                                            <v-layout>
                                                <v-flex>
                                                    <v-file-input v-model="$store.state.barang.editForm.files"
                                                        accept="image/*" :rules="rules" placeholder="Pick an images"
                                                        prepend-icon="mdi-camera" label="Product Images"></v-file-input>
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
import ModalForm from "../dialog/addBarang.vue";
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
                { text: "No.", value: "num", width: 100, align: "left" },
                { text: "Foto", value: "foto" },
                { text: "Nama Produk", value: "produk" },
                { text: "Kategori", value: "kategori" },
                { text: "Harga Beli", value: "harga_beli" },
                { text: "Harga Jual", value: "harga_jual" },
                { text: "Stok", value: "stok" },
                { text: "Updated By", value: "useredit" },
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
                .dispatch("barang/fetchList", {
                    page: this.pagination.page,
                    itemsPerPage: this.pagination.itemsPerPage,
                    name: this.$store.state.barang.searchForm.name
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
        fetchCat() {
            this.$store
                .dispatch("kategori/fetchListAll", {
                    page: 1
                })
                .then(() => {

                })
                .catch((res) => {
                    this.$store.commit("main/setSnackbarFail", res);
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
            this.$store.state.barang.editForm.id = item.id
            this.$store.state.barang.editForm.name = item.nama_produk;
            this.$store.state.barang.editForm.kode = item.kode_produk;
            this.$store.state.barang.editForm.kategori = item.id_kategori;
            this.$store.state.barang.editForm.stok = item.stok;
            this.$store.state.barang.editForm.hargabeli = item.harga_beli;
            this.$store.state.barang.editForm.hargajual = item.harga_jual;
            this.$store.state.barang.editForm.files = "";
        },
        showAdd() {
            this.$store.state.barang.attributes.dialogAdd = true;
            this.$store.state.barang.addForm.name = "";
            this.$store.state.barang.addForm.kode = "";
            this.$store.state.barang.addForm.name = "";
            this.$store.state.barang.addForm.kategori = "";
            this.$store.state.barang.addForm.stok = "";
            this.$store.state.barang.addForm.hargabeli = "";
            this.$store.state.barang.addForm.hargajual = "";
            this.$store.state.barang.addForm.files = "";
        },
        edit(dlg) {
            this.$store.commit("main/setLoading", true);
            this.loading = true;
            this.loadingtext = "Loading... Please wait";

            //alert("limits "+this.pagination.itemsPerPage);

            this.$store
                .dispatch("barang/update", {
                    id: this.$store.state.barang.editForm.id,
                    kode_produk: this.$store.state.barang.editForm.kode,
                    nama_produk: this.$store.state.barang.editForm.name,
                    id_kategori: this.$store.state.barang.editForm.kategori,
                    stok: this.$store.state.barang.editForm.stok,
                    harga_beli: this.$store.state.barang.editForm.hargabeli,
                    harga_jual: this.$store.state.barang.editForm.hargajual,
                    foto_produk: this.$store.state.barang.editForm.files
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
        this.fetchCat();
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
        listBarang() {
            return this.$store.state.barang.attributes.list.map(
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