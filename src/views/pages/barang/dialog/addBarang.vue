<template>

    <v-dialog transition="dialog-top-transition" max-width="600" v-model="$store.state.barang.attributes.dialogAdd">

        <!-- <template v-slot:default="dialog"> -->
        <template>

            <v-card>
                <v-toolbar color="success" dark>Add New Barang</v-toolbar>


                <v-container>
                    <v-layout>
                        <v-flex>
                            <v-text-field v-model="$store.state.barang.addForm.kode" label="Kode Produk">
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex>
                            <v-text-field v-model="$store.state.barang.addForm.name" label="Nama Produk">
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex>
                            <v-autocomplete v-model="$store.state.barang.addForm.kategori"
                                :items="$store.state.kategori.attributes.alllist" item-text="nama_kategori"
                                item-value="id" label="Kategori Produk">
                            </v-autocomplete>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex>
                            <v-text-field type="number" step="any" min="0"
                                v-model="$store.state.barang.addForm.hargabeli" label="Harga Beli">
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex>
                            <v-text-field type="number" step="any" min="0"
                                v-model="$store.state.barang.addForm.hargajual" label="Harga Jual">
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex>
                            <v-text-field type="number" v-model="$store.state.barang.addForm.stok" label="Stok">
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex>
                            <v-file-input v-model="$store.state.barang.addForm.files" accept="image/*" :rules="rules"
                                placeholder="Pick an images" prepend-icon="mdi-camera"
                                label="Product Images"></v-file-input>
                        </v-flex>
                    </v-layout>

                </v-container>

                <v-card-actions class="justify-end">
                    <v-btn text @click="$store.state.barang.attributes.dialogAdd = false">Close</v-btn>
                    <v-btn color="success" @click="addBarang()">Submit</v-btn>
                </v-card-actions>
            </v-card>

        </template>

    </v-dialog>

</template>

<script>
//import { defineComponent } from '@vue/composition-api'

export default {
    data() {
        return {
            formadd: {

            },
            rules: [
                value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
            ],
        }
    },
    mounted() {
        //  console.log("DetailsEMoney Member" , this.detailsEmoney);

    },
    methods: {
        addBarang: function () {
            this.$store.commit("main/setLoading", true);
            this.$store
                .dispatch("barang/add", {
                    kode_produk: this.$store.state.barang.addForm.kode,
                    nama_produk: this.$store.state.barang.addForm.name,
                    id_kategori: this.$store.state.barang.addForm.kategori,
                    stok: this.$store.state.barang.addForm.stok,
                    harga_beli: this.$store.state.barang.addForm.hargabeli,
                    harga_jual: this.$store.state.barang.addForm.hargajual,
                    foto_produk: this.$store.state.barang.addForm.files
                })
                .then(() => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarSuccess", "Add Data Successfull");
                    this.$store.state.barang.attributes.dialogAdd = false;

                    this.fetch();
                })
                .catch((res) => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res);
                    this.loading = false;
                    this.loadingtext = '';
                });
        },
        fetch() {
            this.$store.commit("main/setLoading", true);
            this.loading = true;
            this.loadingtext = "Loading... Please wait";

            this.$store
                .dispatch("barang/fetchList", {
                    page: 1
                })
                .then(() => {
                    this.$store.commit("main/setLoading", false);
                    this.loading = false;
                    this.loadingtext = "";

                })
                .catch((res) => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res);
                    this.loading = false;
                    this.loadingtext = "";
                });
        }
    }
}

</script>
