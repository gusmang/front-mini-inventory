<template>
    <v-dialog transition="dialog-top-transition" max-width="600"
        v-model="$store.state.memberMain.main.dialogMemberEdit">
        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar color="success" dark>Form Edit Detail Member</v-toolbar>

                <v-layout style="display:none;">

                    <v-text-field v-model="$store.state.memberMain.editmember.formEdit.userId" label="" hidden>
                    </v-text-field>

                </v-layout>

                <v-container>

                    <v-layout>
                        <v-flex>
                            <v-text-field v-model="$store.state.memberMain.editmember.formEdit.edit_name" label="Name">
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex>
                            <v-text-field v-model="$store.state.memberMain.editmember.formEdit.edit_email"
                                label="Email">
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex>
                            <v-text-field v-model="$store.state.memberMain.editmember.formEdit.edit_phone"
                                label="Phone">
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                </v-container>

                <v-card-actions class="justify-end">
                    <v-btn text @click="dialog.value = false">Close</v-btn>
                    <v-btn color="success" @click="editProfiles()">Submit</v-btn>
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
        editProfiles: function () {
            this.$store.commit("main/setLoading", true);
            this.$store
                .dispatch("member/editProfiles", {
                    userId: this.$store.state.memberMain.editmember.formEdit.userId,
                    edit_name: this.$store.state.memberMain.editmember.formEdit.edit_name,
                    edit_email: this.$store.state.memberMain.editmember.formEdit.edit_email,
                    updateId: this.$store.state.auth.profile.id,
                    edit_phone: this.$store.state.memberMain.editmember.formEdit.edit_phone
                })
                .then(() => {
                    this.showDetail(this.$store.state.memberMain.editmember.formEdit.userId);
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("memberMain/setMainDialogMemberEdit", false);
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