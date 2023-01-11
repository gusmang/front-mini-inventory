<template>
  <v-card>
    <div v-if="$store.state.memberMain.main.detail.verified == 1">
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr style="text-align: center">
              <td>KTP</td>
              <td>Buku Tabungan</td>
              <td>Selfie</td>
            </tr>
            <tr style="text-align: center">
              <td>
                <img v-bind:src="$store.state.memberMain.main.detail.ktp_image" style="width: 120px"
                  @click="$store.commit('memberMain/setMainDialog', 'image')" />
              </td>
              <td>
                <img v-bind:src="$store.state.memberMain.main.detail.tab_image" style="width: 120px"
                  @click="$store.commit('memberMain/setMainDialog', 'image')" />
              </td>
              <td>
                <img v-bind:src="$store.state.memberMain.main.detail.slf_image" style="width: 120px"
                  @click="$store.commit('memberMain/setMainDialog', 'image')" />
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <v-card-text v-else>
      <v-container class="d-flex justify-center align-center" style="min-height:400px;">
        <v-row>
          <v-col md="12" style="text-align:center;">
            <h3 class="mx-auto">No Data <br /> ( User Not Verified )</h3>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {};
</script>

<style>

</style>