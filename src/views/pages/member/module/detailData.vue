<template>
  <div>
    <custom-card>
      <template v-slot:toolbar>
        <div style="width: 100%">
          <v-btn
            color="success"
            small
            outlined
            @click="$store.commit('memberMain/setMainPage', 'list')"
            style="float: left"
          >
            <v-icon>mdi-chevron-left</v-icon> Back to List
          </v-btn>
          <v-btn
            color="success"
            small
            outlined
            @click="fetch()"
            style="float: right"
          >
            <v-icon>mdi-refresh</v-icon> Refresh
          </v-btn>
        </div>
      </template>

      <template v-slot:datatable>
        <v-layout row wrap>
          <v-flex xs5 class="pr-2">
            <v-card flat>
              <main-detail />
            </v-card>
          </v-flex>
          <v-flex xs7 class="pl-2">
            <v-card flat>
              <v-toolbar flat dense>
                <v-tabs
                  v-model="tab"
                  background-color="transparent"
                  center-active
                  fixed-tabs
                >
                  <v-tabs-slider color="black"></v-tabs-slider>
                  <v-tab key="tab3">Data Bank</v-tab>
                  <v-tab key="tab1">Address</v-tab>
                  <v-tab key="tab2">Data Image</v-tab>
                </v-tabs>
              </v-toolbar>
              <v-tabs-items v-model="tab">
                <v-tab-item key="tab">
                  <data-bank />
                </v-tab-item>
                <v-tab-item key="tab1"> <data-address /> </v-tab-item>
                <v-tab-item key="tab2"> <data-image /> </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </custom-card>
    <unverify />
    <suspend />
    <edit-main />
    <image-data />
    <edit-bank />
  </div>
</template>

<script>
import CustomCard from "../../../../components/CustomCard.vue";
import MainDetail from "./component/mainDetail.vue";
import DataBank from "./component/dataBank.vue";
import DataAddress from "./component/dataAddress.vue";
import DataImage from "./component/dataImage.vue";
import Unverify from "./dialog/unverify.vue";
import Suspend from "./dialog/suspend.vue";
import EditMain from "./dialog/editMain.vue";
import ImageData from "./dialog/imageData.vue";
import EditBank from "./dialog/editBank.vue";
export default {
  components: {
    CustomCard,
    MainDetail,
    DataBank,
    DataAddress,
    DataImage,
    Unverify,
    Suspend,
    EditMain,
    ImageData,
    EditBank,
  },
  data() {
    return {
      tab: 0,
    };
  },
};
</script>

<style>
</style>