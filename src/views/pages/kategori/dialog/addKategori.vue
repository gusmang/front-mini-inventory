<template>

    <v-dialog transition="dialog-top-transition" max-width="600" v-model="$store.state.kategori.attributes.dialogAdd">

        <!-- <template v-slot:default="dialog"> -->
        <template>

            <v-card>
                <v-toolbar color="success" dark>Add New Kategori</v-toolbar>


                <v-container>
                    <v-layout>
                        <v-flex>
                            <v-text-field v-model="$store.state.kategori.addForm.name" label="Nama Lengkap">
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                </v-container>

                <v-card-actions class="justify-end">
                    <v-btn text @click="$store.state.kategori.attributes.dialogAdd = false">Close</v-btn>
                    <v-btn color="success" @click="addMember()">Submit</v-btn>
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
        addMember: function () {
            this.$store.commit("main/setLoading", true);
            this.$store
                .dispatch("kategori/add", {
                    nama_kategori: this.$store.state.kategori.addForm.name,
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
                .dispatch("kategori/fetchList", {
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
