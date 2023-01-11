<template>
    <v-dialog v-model="$store.state.member.member.dialogLock" transition="dialog-top-transition" max-width="600">
        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar color="success" dark>Lock Member Balance</v-toolbar>
                <v-text-field v-model="formLock.userId" hidden label="">
                </v-text-field>

                <v-container>
                    <v-layout>
                        <v-flex>
                            <v-text-field v-model="formLock.last_balance" label="Last Balance" disabled>
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex>
                            <v-text-field v-model="formLock.lock_user" label="Lock Balance by User" value="0">
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex>
                            <v-text-field v-model="formLock.lock_dinaran" label="Lock Balance by Dinaran" value="0">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>

                <v-card-actions class="justify-end">
                    <v-btn text @click="dialog.value = false">Close</v-btn>
                    <v-btn color="success" @click="submitLock(dialog)">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>


<script>
export default {
    data() {
        return {
            formLock: {
                last_balance: 0
            }
        }
    },
    methods: {
        submitLock: function (dialog) {
            //this.$store.commit("main/setLoading", true);
            this.$store
                .dispatch("member/postLockGold", {
                    userId: this.formLock.userId,
                    lockdinaran: this.formLock.lock_dinaran,
                    lockuser: this.formLock.lock_user,
                    updateId: this.profiles.id,
                    page: this.pagination.page,
                })
                .then(() => {
                    //   this.$store.commit("main/setLoading", false);
                    //   this.loading = false;
                    //   this.loadingtext = '';

                    this.fetch(0);
                    dialog.value = false;
                })
                .catch((res) => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res.response.data.message);
                    this.loading = false;
                    this.loadingtext = "";
                });
        },
    }
}
</script>