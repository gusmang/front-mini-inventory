<template>
  <div>
    <DialogEditMember />
    <SuspendEditMember />
    <UnSuspendEditMember />
    <!-- <UnVerifiedDialog /> -->
    <v-simple-table>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <th class="text-left">Dinaran ID</th>
              <td style="text-align: right">:</td>
              <td>{{ $store.state.memberMain.main.detail.format_id }}</td>
            </tr>
            <tr>
              <th class="text-left">Name</th>
              <td style="text-align: right">:</td>
              <td>{{ $store.state.memberMain.main.detail.name }}</td>
            </tr>
            <tr>
              <th class="text-left">Email</th>
              <td style="text-align: right">:</td>
              <td>{{ $store.state.memberMain.main.detail.new_email }}</td>
            </tr>
            <tr>
              <th class="text-left">Phone</th>
              <td style="text-align: right">:</td>
              <td>{{ $store.state.memberMain.main.detail.phone }}</td>
            </tr>
            <tr>
              <th class="text-left">Register Date</th>
              <td style="text-align: right">:</td>
              <td>
                {{
    $store.state.memberMain.main.detail.verified_at +
    " " +
    $store.state.memberMain.main.detail.verified_time
}}
              </td>
            </tr>
            <tr>
              <th class="text-left">Status</th>
              <td style="text-align: right">:</td>
              <td>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn :color="emailVerified" text rounded v-bind="attrs" v-on="on">
                      <v-icon>mdi-email-outline</v-icon>
                    </v-btn></template>
                  <span v-if="
  $store.state.memberMain.main.detail.email_verified == 0
">Email Unverified</span>
                  <span v-else>Email Verified</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn :color="accountVerifiedColor" text rounded v-bind="attrs" v-on="on">
                      <v-icon>{{ accountVerified }}</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ accountVerifiedStatus }}</span>
                </v-tooltip>
              </td>
            </tr>
            <tr>
              <th>Balance</th>
              <td style="text-align: right">:</td>
              <td>
                {{
    $store.state.memberMain.main.detail.real_gramasi +
    " (" +
    $store.state.memberMain.main.detail.bal_gramasi +
    ") gr"
}}
              </td>
            </tr>
            <tr>
              <th rowspan="4">Lock Balance</th>
              <td rowspan="4" style="text-align: right">:</td>
            </tr>
            <tr>
              <td>
                <v-layout row wrap>
                  <v-flex xs8>
                    <b>Emas Impian</b>
                  </v-flex>
                  <v-flex>
                    <v-btn text small>
                      {{ $store.state.memberMain.main.detail.lock_emasimpian }}
                    </v-btn>
                  </v-flex>
                </v-layout>
              </td>
            </tr>
            <tr>
              <td>
                <v-layout row wrap>
                  <v-flex xs8>
                    <b>Dinaran</b>
                  </v-flex>
                  <v-flex>
                    <v-spacer></v-spacer>
                    <v-btn text small>
                      {{ $store.state.memberMain.main.detail.lock_dinaran }}
                    </v-btn>
                  </v-flex>
                </v-layout>
              </td>
            </tr>
            <tr>
              <td>
                <v-layout row wrap>
                  <v-flex xs8>
                    <b>User</b>
                  </v-flex>
                  <v-flex>
                    <v-btn text small>
                      {{ $store.state.memberMain.main.detail.lock_user }}
                    </v-btn>
                  </v-flex>
                </v-layout>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-simple-table>
    <v-card-actions>
      <v-btn color="warning" small outlined @click="showDialogMemberEdit($store.state.memberMain.main.detail)">
        <v-icon small class="mr-3">mdi-pencil</v-icon> edit data
      </v-btn>
      <v-spacer></v-spacer>
      <!-- <v-btn color="error" small outlined v-if="$store.state.memberMain.main.detail.verified == 1"
        @click="showDialogUnverified($store.state.memberMain.main.detail)">
        <v-icon small class="mr-3">mdi-account-alert</v-icon> Unverify user
      </v-btn> -->
      <v-spacer></v-spacer>
      <v-btn color="error" small outlined v-if="$store.state.memberMain.main.detail.is_block === false"
        @click="showDialogSuspend($store.state.memberMain.main.detail)">
        <v-icon small class="mr-3">mdi-account-off</v-icon> suspend
      </v-btn>
      <v-btn color="success" small outlined v-if="$store.state.memberMain.main.detail.is_block === true"
        @click="showDialogUnSuspend($store.state.memberMain.main.detail)">
        <v-icon small class="mr-3">mdi-check</v-icon> unSuspend
      </v-btn>

    </v-card-actions>
  </div>
</template>

<script>
import DialogEditMember from "../component/dialog/dialogEditMember.vue";
import SuspendEditMember from "../component/dialog/dialogSuspendMember.vue";
import UnSuspendEditMember from "../component/dialog/dialogUnSuspendMember.vue";
//import UnVerifiedDialog from "../component/dialog/dialogUnverified.vue";

export default {
  components:
  {
    DialogEditMember,
    SuspendEditMember,
    UnSuspendEditMember
    //UnVerifiedDialog
  },
  data() {
    return {
    }
  },
  methods: {
    showDialogMemberEdit(items) {
      this.$store.commit("memberMain/setMainDialogMemberEdit", true);
      this.$store.commit("memberMain/setMainFormEdit", items);
    },
    showDialogSuspend(items) {
      this.$store.commit("memberMain/setSuspendDialogMember", true);
      this.$store.commit("memberMain/setMainFormSuspend", items);
    },
    showDialogUnSuspend(items) {
      this.$store.commit("memberMain/setUnSuspendDialogMember", true);
      this.$store.commit("memberMain/setMainFormUnSuspend", items);
    },
    showDialogUnverified(items) {
      this.$store.commit("memberMain/setUnverifiedDialogMember", true);
      this.$store.commit("memberMain/setMainFormUnverified", items);
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
  },
  computed: {
    emailVerified() {
      if (this.$store.state.memberMain.main.detail.email_verified == 1) {
        return "success";
      } else {
        return "error";
      }
    },
    accountVerified() {
      if (this.$store.state.memberMain.main.detail.is_block) {
        return "mdi-account-off";
      } else {
        if (this.$store.state.memberMain.main.detail.verified == 0) {
          return "mdi-account-alert";
        } else {
          return "mdi-account-check";
        }
      }
    },
    accountVerifiedColor() {
      if (this.$store.state.memberMain.main.detail.is_block) {
        return "error";
      } else {
        if (this.$store.state.memberMain.main.detail.verified == 1) {
          return "success";
        } else {
          return "warning";
        }
      }
    },
    accountVerifiedStatus() {
      if (this.$store.state.memberMain.main.detail.is_block) {
        return "Suspended";
      } else {
        if (this.$store.state.memberMain.main.detail.verified == 1) {
          return "Verified";
        } else {
          return "Unverified";
        }
      }
    },
  },
};
</script>

<style>

</style>