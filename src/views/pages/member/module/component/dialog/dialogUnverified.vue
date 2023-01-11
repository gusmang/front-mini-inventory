<template>
    <v-dialog transition="dialog-top-transition" max-width="600"
        v-model="$store.state.memberMain.main.dialogUnverified">
        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar color="success" dark>Unverified User Account</v-toolbar>

                <v-layout style="display:none;">

                    <v-text-field v-model="$store.state.memberMain.unverified.formEdit.userId" label="" hidden>
                    </v-text-field>

                </v-layout>

                <v-container>

                    <v-layout>
                        <v-flex>
                            Yakin anda akan melakukan Unverified atas user ini? Request
                            Verifikasi sebelumnya akan di unverified
                        </v-flex>
                    </v-layout>

                </v-container>

                <v-card-actions class="justify-end">
                    <v-btn text @click="dialog.value = false">Close</v-btn>
                    <v-btn color="success" @click="userUnverify()">Unverified This
                        Account</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            profiles: this.$store.state.auth.profile,
            formLock: {
                userId: 0
            }
        }
    },
    methods: {
        showDetail(id) {
            this.$store.commit("main/setLoading", true);
            this.$store
                .dispatch("memberMain/getMemberDetail", {
                    id_member: id,
                })
                .then(() => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("memberMain/setMainPage", "detail");
                })
                .catch((res) => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res.response.data.message);
                });
        },
        userUnverify: function () {
            this.$store.commit("main/setLoading", true);
            this.$store
                .dispatch("member/userUnverify", {
                    userId: this.$store.state.memberMain.unverified.formEdit.userId,
                    updateId: this.$store.state.auth.profile.id,
                })
                .then(() => {
                    this.showDetail(this.$store.state.memberMain.unverified.formEdit.userId);
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("memberMain/setUnverifiedDialogMember", false);
                })
                .catch((res) => {
                    this.clear();
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res.response.data.message);
                    this.loading = false;
                    this.loadingtext = '';
                });
        },
    }
}
</script>