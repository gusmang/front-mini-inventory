<template>
    <v-dialog transition="dialog-top-transition" max-width="600" v-model="$store.state.memberMain.main.dialogSuspend">
        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar color="error" dark>Suspend User Account </v-toolbar>

                <v-layout style="display:none;">

                    <v-text-field v-model="$store.state.memberMain.suspendmember.formEdit.userId" label="" hidden>
                    </v-text-field>

                </v-layout>

                <v-container>

                    <v-layout>
                        <v-flex>
                            Yakin anda akan melakukan Suspend atas user ini?
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex>
                            <v-text-field v-model="$store.state.memberMain.suspendmember.formEdit.edit_reason"
                                label="Suspend Reason">
                            </v-text-field>
                        </v-flex>
                    </v-layout>


                </v-container>

                <v-card-actions class="justify-end">
                    <v-btn text @click="dialog.value = false">Close</v-btn>
                    <v-btn color="error" @click="userSuspend()">Suspend User Account</v-btn>
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
        clear() {
            this.$store.state.memberMain.suspendmember.formEdit.edit_reason = ""
        },
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
        userSuspend: function () {
            this.$store.commit("main/setLoading", true);
            this.$store
                .dispatch("member/userSuspend", {
                    userId: this.$store.state.memberMain.suspendmember.formEdit.userId,
                    updateId: this.$store.state.auth.profile.id,
                    suspend_reason: this.$store.state.memberMain.suspendmember.formEdit.edit_reason,
                })
                .then(() => {
                    this.clear();
                    this.showDetail(this.$store.state.memberMain.suspendmember.formEdit.userId);
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("memberMain/setSuspendDialogMember", false);
                })
                .catch((res) => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res.response.data.message);
                    this.loading = false;
                    this.loadingtext = '';
                });
        },
    }
}
</script>