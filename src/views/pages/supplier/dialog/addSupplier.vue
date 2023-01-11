<template>

    <v-dialog transition="dialog-top-transition" max-width="600" v-model="$store.state.kategori.attributes.dialogAdd">

        <!-- <template v-slot:default="dialog"> -->
        <template>

            <v-card>
                <v-toolbar color="success" dark>Add New Supplier</v-toolbar>


                <v-container>
                    <v-layout>
                        <v-flex>
                            <v-text-field v-model="$store.state.supplier.addForm.name" label="Nama Supplier">
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex>
                            <v-text-field v-model="$store.state.supplier.addForm.email" label="Email">
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex>
                            <v-text-field v-model="$store.state.supplier.addForm.telepon" label="No. Telepon">
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex>
                            <v-text-field v-model="$store.state.supplier.addForm.alamat" label="Alamat">
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                </v-container>

                <v-card-actions class="justify-end">
                    <v-btn text @click="$store.state.supplier.attributes.dialogAdd = false">Close</v-btn>
                    <v-btn color="success" @click="addSupplier()">Submit</v-btn>
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

            }
        }
    },
    mounted() {
        //  console.log("DetailsEMoney Member" , this.detailsEmoney);

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
    }
}

</script>
