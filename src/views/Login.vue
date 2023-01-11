<template>
  <transition name="slide" mode="out-in">
    <v-container grid-list-xs fluid fill-height class="bggradient">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12" style="padding:20px;" color="#CCCCCC">
            <v-toolbar color="rgb(12 66 1 / 0%)" flat>
              <v-img src="../assets/favi.png" max-height="180px" width="400"
                style="margin-bottom: 20%; margin-top:-80px;">
              </v-img>
            </v-toolbar>

            <v-card-text>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-text-field name="email" label="Username / Email" id="email" :rules="emailRules" v-model="form.email"
                  append-icon="mdi-account" :disabled="$store.state.auth.isAdmin" solo></v-text-field>
                <v-text-field type="password" name="Password" label="Password" v-model="form.password"
                  solo></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="pb-5">
              <v-flex xs12>
                <v-btn color="#333333" block @click="doLogin" dark x-large>
                  Login
                </v-btn>
              </v-flex>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      form: {},
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      loading: false,
      buttonText: "Send OTP",
    };
  },
  created() {
    this.$store.dispatch("auth/tryAutoLogin");
  },
  mounted() {
    //alert(process.env.VUE_APP_API_URL_DEV);
  },
  watch: {
    isLogin(value) {
      if (value) {
        this.$router.push({ name: "Main Dashboard" });
      }
    },
  },
  methods: {
    sendOTP() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("auth/getOTP", {
            email: this.form.email,
          })
          .then(() => {
            //console.log(res);
            this.buttonText = "resend otp";
            //this.form.otp = res.message;
          })
          .catch((res) =>
            this.$store.commit(
              "main/setSnackbarFail",
              res.response.data.message
            )
          );
      }
    },
    doLogin() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("auth/userLogin", {
            email: this.form.email,
            password: this.form.password,
          })
          .then(() => {
            this.$router.push({ name: "Main Dashboard" });
          })
          .catch((res) => {
            this.$store.commit(
              "main/setSnackbarFail",
              res
            );
          });
      }
    },
  },
};
</script>

<style>
.gradient {
  background-image: linear-gradient(to right, #333333, #3a6831, #000000);
  color: #ffff !important;
}

.bggradient {
  background-image: linear-gradient(45deg, #333333, #000000);
  color: #ffff !important;
}

/* TRANSITION */
.slide-enter-active {
  animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active {
  animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }

  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}

/* END TRANSITION */
</style>
