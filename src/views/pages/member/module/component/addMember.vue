<template>

    <v-dialog transition="dialog-top-transition" max-width="600" v-model="$store.state.member.member.dialogAdd">

        <!-- <template v-slot:default="dialog"> -->
        <template>

            <v-card>
                <v-toolbar color="success" dark>Add New Member</v-toolbar>


                <v-container>
                    <v-layout>
                        <v-flex>
                            <v-text-field v-model="formadd.addNama" label="Nama Lengkap">
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex>
                            <v-text-field v-model="formadd.addEmail" label="Email" value="0" type="email">
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex>
                            <v-text-field v-model="formadd.addPassword" label="Password" value="0" type="password">
                            </v-text-field>
                        </v-flex>
                    </v-layout>


                    <v-layout>
                        <v-flex>
                            <v-text-field v-model="formadd.addKota" label="Kota" value="0">
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex>
                            <v-autocomplete v-model="formadd.addStatus" :items="$store.state.member.member.statusList"
                                item-text="text" item-value="value" label="Status">
                            </v-autocomplete>
                        </v-flex>
                    </v-layout>


                </v-container>

                <v-card-actions class="justify-end">
                    <v-btn text @click="dialog.value = false">Close</v-btn>
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
                .dispatch("member/addMember", {
                    nama_lengkap: this.formadd.addNama,
                    password: this.formadd.addPassword,
                    email: this.formadd.addEmail,
                    status: this.formadd.addStatus,
                    kota: this.formadd.addKota,
                })
                .then(() => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarSuccess", "Add Data Member Successfull");
                    this.$store.state.member.member.dialogAdd = false;

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
                .dispatch("member/fetchListMember", {
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
