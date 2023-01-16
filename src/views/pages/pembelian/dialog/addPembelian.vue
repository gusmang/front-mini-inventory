<template>

    <v-row justify="center">
        <v-dialog transition="dialog-top-transition" max-width="1100"
            v-model="$store.state.pembelian.attributes.dialogBarang">

            <!-- <template v-slot:default="dialog"> -->
            <template>

                <v-card>
                    <v-toolbar color="#333333" dark>Pilih Item</v-toolbar>


                    <v-container>
                        <v-layout>
                            <v-flex>
                                <v-data-table :headers="headers" :items="listBarang" :options.sync="pagination"
                                    :server-items-length="$store.state.barang.attributes.total" :footer-props="{
                                        'items-per-page-options': [10, 25, 50, 100],
                                        'items-per-page-text': 'Baris per Halaman:',
                                    }" :items-per-page="10" :loading="loading" :loading-text="loadingtext">

                                    <template v-slot:[`item.produk`]="{ item }">
                                        <div><b>{{ item.nama_produk }}</b></div>
                                        <div><small>{{ item.kode_produk }}</small></div>
                                    </template>

                                    <template v-slot:[`item.action`]="{ item }">

                                        <v-btn color="info" icon @click="addItems(item)">
                                            <v-icon small>mdi-plus</v-icon>
                                        </v-btn>


                                    </template>

                                </v-data-table>
                            </v-flex>
                        </v-layout>

                    </v-container>

                    <v-card-actions class="justify-end">
                        <v-btn text @click="$store.state.kategori.attributes.dialogAdd = false">Close</v-btn>
                        <v-btn color="#333333" style="color:white;" @click="addMember()">Submit</v-btn>
                    </v-card-actions>
                </v-card>
            </template>

        </v-dialog>

        <v-dialog v-model="$store.state.pembelian.attributes.dialogAdd" fullscreen hide-overlay
            transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="#333333">
                    <v-btn icon dark @click="closeModal()">
                        <v-icon>mdi-cash-check</v-icon>
                    </v-btn>
                    <v-toolbar-title>Pembelian Barang</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="closeModal()">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list three-line subheader>
                    <div style="padding:40px 20px 20px 20px; margin:0;">
                        <v-col md="12">
                            <v-row>
                                <v-col md="3">
                                    <v-text-field v-model="$store.state.pembelian.attributes.kode_pembelian"
                                        value="Kode Pembelian" outlined disabled></v-text-field>
                                </v-col>
                                <v-col md="3">
                                    <v-text-field v-model="$store.state.pembelian.attributes.tanggal_pembelian"
                                        value="Tanggal Transaksi" outlined disabled></v-text-field>
                                </v-col>
                                <v-col md="6" style="text-align:right;">
                                    <h1> Rp. {{
                                        $store.state.pembelian.attributes.total_pembelian.toString()
                                            .replace(/[.]/, ',')
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                                    }}, - </h1>
                                </v-col>
                            </v-row>
                        </v-col>
                    </div>

                    <v-layout>

                        <v-col md="12">
                            <v-row style="flex-direction:row-reverse;">
                                <v-col md="4">
                                    <v-btn depressed color="#333333" style="float:right; color:white;"
                                        @click="tambahItem()">
                                        <v-icon>mdi-plus</v-icon> Tambah Item Baru
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>

                    </v-layout>


                    <v-layout style="padding:0 20px;">
                        <v-col md="12"
                            style="border:2px solid #CCCCCC; border-radius:10px; width:100%; min-height:500px;">
                            <table style="width:100%; padding:10px;">
                                <thead style="background:#999999; color:#EEEEEE;">
                                    <tr>
                                        <th width="10%" style="padding:20px;"> Kode Barang </th>
                                        <th width="22%"> Nama Barang </th>
                                        <th width="13%"> Harga Beli </th>
                                        <th width="12%"> Stok </th>
                                        <th width="16%"> Qty </th>
                                        <th width="15%"> Sub Total </th>
                                        <th width="12%"> Aksi </th>
                                    </tr>
                                </thead>
                                <tbody style="border:1px solid #999999;"
                                    v-if="$store.state.pembelian.attributes.itemArray.length == 0">
                                    <tr>
                                        <td colspan="7" style="padding:20px;" align="center"> - Data Item Masih Kosong
                                            -
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody style="border:1px solid #999999;"
                                    v-for="(item, i) in $store.state.pembelian.attributes.itemArray" v-bind:key="i">
                                    <tr style="border:1px solid #999999;"
                                        v-if="$store.state.pembelian.attributes.itemArray.length > 0">
                                        <td style="padding:0 20px; border:1px solid #999999;" align="center"> {{
                                            item.kode_produk
                                        }}
                                        </td>
                                        <td align="center" style="border:1px solid #999999;">
                                            <v-col md="12"
                                                style="padding:0 10px; margin:20px 0 0 0; text-align:center;">
                                                <v-text-field :value="item.nama_produk" outlined
                                                    disabled></v-text-field>
                                            </v-col>
                                        </td>
                                        <td align="center" style="border:1px solid #999999;">
                                            <v-col md="12"
                                                style="padding:0 10px; margin:20px 0 0 0;  text-align:center;">
                                                <v-text-field
                                                    v-model="$store.state.pembelian.attributes.itemHargaBeli[i]"
                                                    outlined type="number" step="1" disabled></v-text-field>
                                            </v-col>
                                        </td>
                                        <td align="center" style="border:1px solid #999999;">
                                            <v-col md="12"
                                                style="padding:0 10px; margin:20px 0 0 0;  text-align:center;">
                                                {{ $store.state.pembelian.attributes.itemStok[i] }}
                                            </v-col>
                                        </td>
                                        <td align="center" style="border:1px solid #999999;">
                                            <v-col md="12" style="padding:0 10px; margin:20px 0 0 0;">
                                                <v-row>
                                                    <v-col md="3">
                                                        <v-btn style="min-width:20px!important"
                                                            @click="changeQty(i, -1)">
                                                            -
                                                        </v-btn>
                                                    </v-col>
                                                    <v-col md="5">
                                                        <v-text-field value="Qty"
                                                            v-model="$store.state.pembelian.attributes.itemHargaQty[i]"
                                                            outlined type="number" step="1" min="1"
                                                            @change="changeNum(i)"></v-text-field>
                                                    </v-col>
                                                    <v-col md="3">
                                                        <v-btn style="min-width:20px!important"
                                                            @click="changeQty(i, 1)">
                                                            +
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </td>
                                        <td align="center" style="padding:0 20px; border:1px solid #999999;">
                                            <v-col md="12" style="padding:0 10px; margin:20px 0 0 0;">
                                                <v-text-field
                                                    v-model="$store.state.pembelian.attributes.itemHargaSubTtl[i]"
                                                    outlined disabled></v-text-field>
                                            </v-col>
                                        </td>
                                        <td align="center" style="padding:0 20px; border:1px solid #999999;">
                                            <v-col md="12" style="padding:0 10px; margin:20px 0 0 0;">
                                                <v-btn class="danger" @click="removeItems(i)">
                                                    <v-icon>mdi-delete</v-icon> Hapus Item</v-btn>
                                            </v-col>
                                        </td>
                                    </tr>

                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="6" align="right" style="padding:10px 0;">
                                            Total Item :
                                        </td>
                                        <td align="right" style="padding:10px 0;">
                                            <span style="font-size:18px!important;"> {{
                                                $store.state.pembelian.attributes.itemArray.length
                                            }} </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="6" align="right">
                                            Total Pembelian :
                                        </td>
                                        <td align="right">
                                            <span style="font-size:18px!important;"> Rp. {{
                                                $store.state.pembelian.attributes.total_pembelian.toString()
                                                    .replace(/[.]/, ',')
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                                            }} </span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </v-col>
                    </v-layout>

                </v-list>
            </v-card>
        </v-dialog>
    </v-row>

</template>

<script>
//import { defineComponent } from '@vue/composition-api'
import _ from 'lodash';
import moment from 'moment';

export default {
    data() {
        return {
            formadd: {

            },
            pagination: {},
            headers: [
                { text: "No.", value: "num", width: 100, align: "left" },
                { text: "Nama Produk", value: "produk" },
                { text: "Kategori", value: "kategori" },
                { text: "Harga Beli", value: "harga_beli" },
                { text: "Harga Jual", value: "harga_jual" },
                { text: "Stok", value: "stok" },
                { text: "Updated By", value: "useredit" },
                { text: "Action", align: "left", value: "action", width: "170" },
            ],
        }
    },
    mounted() {
        //  console.log("DetailsEMoney Member" , this.detailsEmoney);
        this.$store.state.pembelian.attributes.kode_pembelian = _.sampleSize('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 10).join('');
        this.$store.state.pembelian.attributes.tanggal_pembelian = moment().format('YYYY-MM-DD hh:mm');

    },
    methods: {
        addSupplier: function () {
            this.$store.commit("main/setLoading", true);
            this.$store
                .dispatch("supplier/add", {
                    nama: this.$store.state.supplier.addForm.name,
                    email: this.$store.state.supplier.addForm.email,
                    alamat: this.$store.state.supplier.addForm.alamat,
                    telepon: this.$store.state.supplier.addForm.telepon,
                })
                .then(() => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarSuccess", "Add Data Successfull");
                    this.$store.state.kategori.attributes.dialogAdd = false;

                    this.fetch();
                })
                .catch((res) => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res);
                    this.loading = false;
                    this.loadingtext = '';
                });
        },
        addItems(items) {
            this.$store.state.pembelian.attributes.itemArray.push(items);
            this.$store.state.pembelian.attributes.dialogBarang = false;
            this.$store.state.pembelian.attributes.itemHargaQty.push(1)
            this.$store.state.pembelian.attributes.itemHargaBeli.push(items.harga_beli)
            this.$store.state.pembelian.attributes.itemHargaSubTtl.push(items.harga_beli)
            this.$store.state.pembelian.attributes.itemStok.push(items.stok)
            this.$store.state.pembelian.attributes.total_pembelian += 1 * items.harga_beli;
        },
        removeItems(index) {

            let itemAll = this.$store.state.pembelian.attributes.itemArray;

            let con = confirm("Hapus data item " + itemAll[index].kode_produk + " ? ");

            if (con === true) {

                let remaps_array = [];
                let hargabeli = [];
                let subtotal = [];
                let stok = []

                itemAll.forEach((list, indexArr) => {
                    if (index !== indexArr) {
                        //alert("kode_produk" + list.stok);
                        //console.log("listpush", list)
                        hargabeli.push(this.$store.state.pembelian.attributes.itemHargaBeli[indexArr])
                        subtotal.push(this.$store.state.pembelian.attributes.itemHargaSubTtl[indexArr])
                        stok.push(this.$store.state.pembelian.attributes.itemStok[indexArr])
                        remaps_array.push(this.$store.state.pembelian.attributes.itemArray[indexArr])
                    }
                });

                this.$store.state.pembelian.attributes.itemArray = remaps_array;
                this.$store.state.pembelian.attributes.itemHargaBeli = hargabeli;
                this.$store.state.pembelian.attributes.itemHargaSubTtl = subtotal;
                this.$store.state.pembelian.attributes.itemStok = stok;

            }
        },
        changeQty(index, inc) {
            let remap_array = [];
            this.$store.state.pembelian.attributes.total_pembelian = 0;
            this.$store.state.pembelian.attributes.itemHargaQty.forEach((number, indexarr) => {
                if (indexarr === index) {
                    if (this.$store.state.pembelian.attributes.itemHargaQty[index] >= this.$store.state.pembelian.attributes.itemStok[index]) {
                        alert("out of stock !");
                        remap_array.push(1);
                    }
                    else if (this.$store.state.pembelian.attributes.itemHargaQty[index] <= 1 && inc === -1) {
                        remap_array.push(1);

                    }
                    else {
                        remap_array.push(parseInt(number) + inc);
                    }
                }
                else {
                    remap_array.push(parseInt(number));
                }

                this.$store.state.pembelian.attributes.total_pembelian += remap_array[indexarr] * this.$store.state.pembelian.attributes.itemHargaBeli[indexarr];
            });

            //$store.state.pembelian.attributes.total_pembelian = 

            this.$store.state.pembelian.attributes.itemHargaQty = remap_array;
            this.$store.state.pembelian.attributes.itemHargaSubTtl[index] = this.$store.state.pembelian.attributes.itemHargaQty[index] * this.$store.state.pembelian.attributes.itemHargaBeli[index];
        },
        changeNum(index) {
            let remap_array = [];
            this.$store.state.pembelian.attributes.itemHargaQty.forEach((number, indexarr) => {
                if (indexarr === index) {
                    if (this.$store.state.pembelian.attributes.itemHargaQty[index] >= this.$store.state.pembelian.attributes.itemStok[index]) {
                        alert("out of stock !");
                        remap_array.push(1);
                    }
                    else if (this.$store.state.pembelian.attributes.itemHargaQty[index] < 1) {
                        remap_array.push(1);
                    }
                    else {
                        remap_array.push(parseInt(this.$store.state.pembelian.attributes.itemHargaQty[index]));
                    }
                }
                else {
                    remap_array.push(parseInt(number));
                }
                remap_array.push(parseInt(number));
            });

            this.$store.state.pembelian.attributes.itemHargaQty = remap_array;
            this.$store.state.pembelian.attributes.itemHargaSubTtl[index] = this.$store.state.pembelian.attributes.itemHargaQty[index] * this.$store.state.pembelian.attributes.itemHargaBeli[index];
        },
        closeModal() {
            this.$store.state.pembelian.attributes.dialogAdd = false;
        },
        tambahItem() {
            this.fetchBarang();
        },
        fetchBarang(cari) {
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

                    this.$store.state.pembelian.attributes.dialogBarang = true;
                })
                .catch((res) => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res.response.data.message);
                    this.loading = false;
                    this.loadingtext = "";
                });
        },
        fetch() {
            this.$store.commit("main/setLoading", true);
            this.loading = true;
            this.loadingtext = "Loading... Please wait";

            this.$store
                .dispatch("supplier/fetchList", {
                    page: 1
                })
                .then(() => {
                    this.$store.commit("main/setLoading", false);
                    this.loading = false;
                    this.loadingtext = "";
                    this.$store.commit("main/setSnackbarSuccess", this.$store.state.member.member.messageInp);

                })
                .catch((res) => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res);
                    this.loading = false;
                    this.loadingtext = "";
                });
        }
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
}

</script>
