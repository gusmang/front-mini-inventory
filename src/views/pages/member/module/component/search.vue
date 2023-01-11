<template>
  <v-expansion-panels v-model="panel" multiple>
    <v-expansion-panel expand focusable>
      <v-expansion-panel-content>
        <v-layout>
          <v-flex>
            <v-text-field
              v-model="form.member"
              label="Search By Email / Nama / Phone"
              single-line
              small
              clearable
              @keyup.13="searchMember(1)"
            >
            </v-text-field>
          </v-flex>
          <v-flex>
            <v-autocomplete
              v-model="form.status_verified"
              :items="status"
              item-text="text"
              item-value="value"
              label="Status Verified"
            >
            </v-autocomplete>
          </v-flex>
          <v-flex>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateRangeText"
                  label="Register Date"
                  prepend-icon="mdi-calendar"
                  clearable
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="form.date" no-title scrollable range>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-autocomplete
              v-model="form.monthDate"
              :items="bulan"
              item-text="text"
              item-value="value"
              label="Month BirthDate"
            >
            </v-autocomplete>
          </v-flex>

          <v-flex>
            <v-autocomplete
              v-model="form.religion"
              :items="religion"
              item-text="text"
              item-value="value"
              label="Religion"
            >
            </v-autocomplete>
          </v-flex>
          <v-flex>
            <v-autocomplete
              v-model="form.gender"
              :items="gender"
              item-text="text"
              item-value="value"
              label="Gender"
            >
            </v-autocomplete>
          </v-flex>

          <v-flex>
            <v-autocomplete
              v-model="form.provinsiList"
              :items="$store.state.wilayah.wilayah.list"
              item-text="provinsi"
              item-value="provinsi"
              label="Provinsi"
            >
            </v-autocomplete>
          </v-flex>
        </v-layout>

        <v-layout align-end justify-end>
          <v-btn color="warning" @click="clearForm()" small depressed>
            Clear
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn small depressed color="success" class="m0" @click="search()">
            <v-icon>mdi-magnify</v-icon> Search
          </v-btn>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  props: {
    panel: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      form: {},
      menu: false,
      status: [
        { text: "All Status", value: "" },
        { text: "Email Verified", value: "email_verified" },
        { text: "Email Not Verified", value: "email_not_verified" },
        { text: "User Verified", value: "user_verified" },
        { text: "User Not Verified", value: "user_not_verified" },
        { text: "User Suspend", value: "user_suspend" },
      ],
      bulan: [
        { text: "Januari", value: "01" },
        { text: "Februari", value: "02" },
        { text: "Maret", value: "03" },
        { text: "April", value: "04" },
        { text: "Mei", value: "05" },
        { text: "Juni", value: "06" },
        { text: "Juli", value: "07" },
        { text: "Agustus", value: "08" },
        { text: "September", value: "09" },
        { text: "Oktober", value: "10" },
        { text: "November", value: "11" },
        { text: "Desember", value: "12" },
      ],
      religion: [
        { text: "All Religion", value: "" },
        { text: "Hindu", value: "Hindu" },
        { text: "Katolik", value: "Katolik" },
        { text: "Kristen", value: "Kristen" },
        { text: "Buddha", value: "Buddha" },
        { text: "Islam", value: "Islam" },
        { text: "Konghucu", value: "Konghucu" },
      ],
      gender: [
        { text: "All Gender", value: "" },
        { text: "Laki-Laki", value: "Laki-Laki" },
        { text: "Perempuan", value: "Perempuan" },
      ],
      provinsiList: [],
      date: "",
    };
  },
  methods: {
    search() {
      this.$store.commit("main/setLoading", true);
      this.$store.commit("memberMain/setMainSearch", this.form);
      this.$store
        .dispatch("memberMain/fetchMainList")
        .then(() => {
          this.$store.commit("main/setLoading", false);
        })
        .catch((res) =>
          this.$store.commit("main/setSnackbarFail", res.response.data.message)
        );
    },
    clearForm() {
      this.form = {};
    },
  },
  mounted() {
    this.$store.dispatch("wilayah/fetchWilayah", {
      find: "provinsi",
    });
  },
  computed: {
    dateRangeText() {
      if (typeof this.form.date != "undefined") {
        if (this.form.date.length > 1) {
          return this.form.date.join(" - ");
        } else {
          return this.form.date[0];
        }
      } else {
        return null;
      }
    },
  },
};
</script>

<style>
</style>