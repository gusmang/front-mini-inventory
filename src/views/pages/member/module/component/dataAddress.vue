<template>
  <v-card>
    <div v-if="$store.state.memberMain.main.detail.verified == 1">
      <v-subheader>KTP</v-subheader>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <th width="30%">Provinsi</th>
              <td style="text-align: right" width="5%">:</td>
              <td>{{ $store.state.memberMain.main.detail.provinsi }}</td>
            </tr>
            <tr>
              <th>Kabupaten</th>
              <td style="text-align: right">:</td>
              <td>{{ $store.state.memberMain.main.detail.kabupaten }}</td>
            </tr>
            <tr>
              <th>Kecamatan</th>
              <td style="text-align: right">:</td>
              <td>{{ $store.state.memberMain.main.detail.kecamatan }}</td>
            </tr>
            <tr>
              <th>Kelurahan</th>
              <td style="text-align: right">:</td>
              <td>{{ $store.state.memberMain.main.detail.kelurahan }}</td>
            </tr>
            <tr>
              <th>Kode Pos</th>
              <td style="text-align: right">:</td>
              <td>{{ $store.state.memberMain.main.detail.kode_post }}</td>
            </tr>
            <tr>
              <th>Alamat</th>
              <td style="text-align: right">:</td>
              <td>{{ $store.state.memberMain.main.detail.address }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-subheader>Pengiriman</v-subheader>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <th width="30%">Provinsi</th>
              <td style="text-align: right" width="5%">:</td>
              <td>
                {{ $store.state.memberMain.main.detail.current_provinsi }}
              </td>
            </tr>
            <tr>
              <th>Kabupaten</th>
              <td style="text-align: right">:</td>
              <td>
                {{ $store.state.memberMain.main.detail.current_kabupaten }}
              </td>
            </tr>
            <tr>
              <th>Kecamatan</th>
              <td style="text-align: right">:</td>
              <td>
                {{ $store.state.memberMain.main.detail.current_kecamatan }}
              </td>
            </tr>
            <tr>
              <th>Kelurahan</th>
              <td style="text-align: right">:</td>
              <td>
                {{ $store.state.memberMain.main.detail.current_kelurahan }}
              </td>
            </tr>
            <tr>
              <th>Kode Pos</th>
              <td style="text-align: right">:</td>
              <td>
                {{ $store.state.memberMain.main.detail.current_kodepost }}
              </td>
            </tr>
            <tr>
              <th>Alamat</th>
              <td style="text-align: right">:</td>
              <td>{{ $store.state.memberMain.main.detail.current_address }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="warning" small outlined>
          <v-icon small class="mr-3">mdi-pencil</v-icon> edit data
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