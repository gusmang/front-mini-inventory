<template>
  <div>

    <v-dialog v-model="$store.state.memberMain.main.dialogLock" transition="dialog-top-transition" max-width="600">
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
            <v-btn color="success" @click="submitLock()">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <v-data-table :headers="headers" :items="$store.state.memberMain.main.list" :options.sync="pagination"
      :server-items-length="$store.state.memberMain.main.total" :footer-props="{
  'items-per-page-options': [10, 25, 50, 100],
  'items-per-page-text': 'Baris per Halaman:',
}" :items-per-page="10" :loading="loading">
      <template v-slot:item="{ item, index }">
        <tr @click="expandRow(item, index)">
          <td>
            <v-icon small>mdi-{{ icons }}</v-icon>
            <b>{{ item.name }}</b> <br />
            <div class="sub-items-tables">{{ item.email }}</div>
            <div v-if="expandedIndex == index" class="sub-items-tables">
              {{ item.format_id }} <br />
              {{ item.phone }} <br />
              {{ item.religion }} <br />
              Birthdate : {{ item.date_of_birth }}
            </div>
          </td>
          <td style="text-align: right">
            {{ item.trxCount }}
          </td>
          <td>
            <div style="text-align: right">
              <b> {{ item.bal_gramasi }} </b> <br />
            </div>
            <div style="margin-top: -5px; text-align: right">
              <small> {{ item.real_gramasi }} </small>
            </div>
          </td>
          <td>
            <div style="text-align: right">
              <div>
                <small>
                  Emas Impian
                  <v-icon small @click="showExpand($event, item.id)">mdi-chevron-right</v-icon>
                  <b> {{ item.lock_emasimpian }} </b>
                </small>
              </div>
              <div style="margin-top: -5px">
                <small>
                  Dinaran
                  <v-icon small @click="showExpand($event, item.id)">mdi-chevron-right</v-icon>
                  <b> {{ item.lock_dinaran }} </b>
                </small>
              </div>
              <div style="margin-top: -5px">
                <small>
                  User
                  <v-icon small @click="showExpand($event, item.id)">mdi-chevron-right</v-icon>
                  <b> {{ item.lock_user }} </b>
                </small>
              </div>
            </div>
          </td>
          <td>
            <div>{{ item.verified_at }}</div>
            <div style="margin-top: -5px">
              <small> {{ item.verified_time }} </small>
            </div>
          </td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn :color="emailVerified(item.email_verified)" text small rounded v-bind="attrs" v-on="on">
                  <v-icon small>mdi-email-outline</v-icon>
                </v-btn></template>
              <span v-if="item.email_verified == 0">Email Unverified</span>
              <span v-else>Email Verified</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn :color="accountVerifiedColor(item)" text small rounded v-bind="attrs" v-on="on">
                  <v-icon small>{{ accountVerified(item) }}</v-icon>
                </v-btn>
              </template>
              <span>{{ accountVerifiedStatus(item) }}</span>
            </v-tooltip>
          </td>
          <td>
            <v-btn color="info" small text>
              {{ item.tukangupdate }}
            </v-btn>
          </td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="success" icon @click="showDetail(item.id)" v-bind="attrs" v-on="on">
                  <v-icon small>mdi-eye</v-icon>
                </v-btn>
              </template>
              <span>Detail</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="warning" icon @click="lockDialog(item)" v-bind="attrs" v-on="on">
                  <v-icon small>mdi-lock</v-icon>
                </v-btn>
              </template>
              <span>Lock Balance</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
//import LockBalance from "../component/dialog/dialogLock.vue";

export default {
  components: {
    //LockBalance
  },
  data() {
    return {
      icons: "chevron-right",
      profiles: this.$store.state.auth.profile,
      headers: [
        { text: "Member", value: "name" },
        { text: "Trx", align: "right", value: "trxCount" },
        { text: "Balance (gr)", align: "right", value: "bal_gramasi" },
        {
          text: "Lock Bal (gr)",
          align: "right",
          value: "lock_balance",
        },
        { text: "Reg Date", value: "verified_date" },
        { text: "Verification", value: "em_verified" },
        {
          text: "Update By",
          value: "tukangupdate",
        },
        { text: "Action", align: "left", value: "action" },
      ],
      loading: false,
      pagination: {},
      expandedIndex: -1,
      formLock: {
        last_balance: 0
      }
    };
  },
  methods: {
    submitLock: function () {
      this.$store
        .dispatch("member/postLockGold", {
          userId: this.formLock.userId,
          lockdinaran: this.formLock.lock_dinaran,
          lockuser: this.formLock.lock_user,
          updateId: this.profiles.id,
          page: this.pagination.page,
        })
        .then(() => {
          this.fetch();
          this.$store.commit("memberMain/setMainDialogLock", false);
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

      this.$store.commit(
        "memberMain/setMainPaginationSetting",
        this.pagination
      );

      this.$store
        .dispatch("memberMain/fetchMainList")
        .then(() => {
          this.$store.commit("main/setLoading", false);
          this.loading = false;
        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res.response.data.message);
          this.loading = false;
        });
    },
    expandRow(item, index) {
      if (this.expandedIndex == index) {
        this.icons = "chevron-right";
        this.expandedIndex = -1;
      } else {
        this.expandedIndex = index;
        this.icons = "chevron-down";
      }
    },
    emailVerified(status) {
      if (status == 0) {
        return "error";
      } else {
        return "success";
      }
    },
    accountVerified(item) {
      if (item.is_block) {
        return "mdi-account-off";
      } else {
        if (item.verified == 0) {
          return "mdi-account-alert";
        } else {
          return "mdi-account-check";
        }
      }
    },
    accountVerifiedColor(item) {
      if (item.is_block) {
        return "error";
      } else {
        if (item.verified == 1) {
          return "success";
        } else {
          return "warning";
        }
      }
    },
    accountVerifiedStatus(item) {
      if (item.is_block) {
        return "Suspended";
      } else {
        if (item.verified == 1) {
          return "Verified";
        } else {
          return "Unverified";
        }
      }
    },
    showDetail(id) {
      this.$store.commit("main/setLoading", true);
      this.$store
        .dispatch("memberMain/getMemberDetail", {
          id_member: id,
        })
        .then(() => {
          this.$store.commit("main/setLoading", false);
          this.loading = false;
          this.$store.commit("memberMain/setMainPage", "detail");
        })
        .catch((res) => {
          this.$store.commit("main/setLoading", false);
          this.$store.commit("main/setSnackbarFail", res.response.data.message);
        });
    },
    lockDialog(item) {
      this.formLock.userId = item.id;
      this.formLock.last_balance = item.real_gramasi;
      this.formLock.lock_user = item.lock_user;
      this.formLock.lock_dinaran = item.lock_dinaran;
      this.$store.commit("memberMain/setMainDialogLock", true);
      this.$store.commit("memberMain/setMainDetail", item);
      this.$store.commit("memberMain/setMainDialog", "lock balance");
    },
  },
  watch: {
    pagination() {
      this.fetch();
    },
  },
};
</script>

<style>

</style>