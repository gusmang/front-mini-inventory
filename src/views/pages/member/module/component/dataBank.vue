<template>
  <v-card flat>
    <div v-if="$store.state.memberMain.main.detail.verified == 1">
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <th>NIK</th>
              <td style="text-align: right">:</td>
              <td>{{ $store.state.memberMain.main.detail.nik }}</td>
            </tr>
            <tr>
              <th>Tempat Tanggal Lahir</th>
              <td style="text-align: right">:</td>
              <td>
                {{
    $store.state.memberMain.main.detail.birth_place +
    "/" +
    $store.state.memberMain.main.detail.date_of_birth
}}
              </td>
            </tr>
            <tr>
              <th>Agama</th>
              <td style="text-align: right">:</td>
              <td>{{ $store.state.memberMain.main.detail.religion }}</td>
            </tr>
            <tr>
              <th>Jenis Kelamin</th>
              <td style="text-align: right">:</td>
              <td>{{ $store.state.memberMain.main.detail.gender }}</td>
            </tr>
            <tr>
              <th>Bank</th>
              <td style="text-align: right">:</td>
              <td>
                {{
    $store.state.memberMain.main.detail.bank_id + " - " +
    $store.state.memberMain.main.detail.bank_name_detail
}}
              </td>
            </tr>
            <tr>
              <th>Nama Akun</th>
              <td style="text-align: right">:</td>
              <td>{{ $store.state.memberMain.main.detail.bank_acc_holder }}</td>
            </tr>
            <tr>
              <th>Nomer Rekening</th>
              <td style="text-align: right">:</td>
              <td>{{ $store.state.memberMain.main.detail.bank_acc_number }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="warning" small outlined @click="$store.commit('memberMain/setMainDialog', 'data bank')">
          <v-icon small class="mr-3">mdi-pencil</v-icon> Edit data
        </v-btn>
      </v-card-actions>
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