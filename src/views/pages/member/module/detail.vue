<template>
    <div>
        <!-- <v-btn color="success" @click="fetch">Detail Member</v-btn> -->
        <p></p>

        <CustomCard>

            <template v-slot:toolbar>
                <div style="width:100%;">
                    <v-btn color="success" small outlined @click="showList()" style="float:left;">
                        <v-icon>mdi-chevron-left</v-icon> Back to List
                    </v-btn>
                    <v-btn color="success" small outlined @click="fetch()" style="float:right;">
                        <v-icon>mdi-refresh</v-icon> Refresh
                    </v-btn>
                </div>
            </template>

            <template v-slot:datatable>
                <v-flex md12 style="overflow-x: scroll">

                    <v-data-table :headers="headers" :items="$store.state.member.member.listDetail" :loading="loading"
                        :loading-text="loadingtext">

                        <template v-slot:[`item.verified_date`]="{ item }">
                            <div> {{ item.verified_at }} </div>
                            <div style="margin-top:-5px;"> <small> {{ item.verified_time }} </small> </div>
                            <!-- <div style="margin-top:-5px;"> <small> {{ item.real_gramasi }} </small> </div>
                            <div style="margin-top:-5px;"> <small> GR </small> </div> -->
                        </template>

                        <template v-slot:[`item.em_verified`]="{ item }">

                            <div style="text-align:center;">
                                <div v-if="item.email_verified == 0" style="color:red;">
                                    <v-icon small color="red">mdi-block-helper</v-icon>
                                    <div style="margin-top:-5px;"> <small> Not Verified </small> </div>
                                </div>
                                <div v-if="item.email_verified == 1" style="color:green;">
                                    <v-icon small color="green">mdi-check</v-icon>
                                    <div style="margin-top:-5px;"> <small> Verified </small> </div>
                                </div>
                            </div>

                        </template>

                        <template v-slot:[`item.verified`]="{ item }">
                            <div style="text-align:center;">

                                <!-- <div v-if="item.verified == 0" style="color:red;"> 
                                <v-icon small color="red">mdi-block-helper</v-icon> 
                                <div style="margin-top:-5px;"> <small> Not Verified </small> </div>
                            </div>
                            <div v-if="item.verified == 1" style="color:green;"> 
                                <v-icon small color="green">mdi-check</v-icon> 
                                <div style="margin-top:-5px;"> <small>  Verified </small> </div>
                            </div> -->

                                <div v-if="item.is_block == false" style="color:red;">

                                    <div v-if="item.verified == 0" style="color:red;">
                                        <v-icon small color="red">mdi-block-helper</v-icon>
                                        <div style="margin-top:-5px;"> <small> Not Verified </small> </div>
                                    </div>
                                    <div v-if="item.verified == 1" style="color:green;">
                                        <v-icon small color="green">mdi-check</v-icon>
                                        <div style="margin-top:-5px;"> <small> Verified </small> </div>
                                    </div>

                                </div>

                                <div v-if="item.is_block == true" style="color:red;">
                                    <!-- <div v-if="item.verified == 0" style="color:red;">  -->
                                    <v-icon small color="red">mdi-block-helper</v-icon>
                                    <div style="margin-top:-5px;"> <small> Suspend </small> </div>
                                    <!-- </div> -->
                                </div>
                            </div>
                        </template>

                        <template v-slot:[`item.action`]="{ item }">

                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="info" icon v-bind="attrs" v-on="on"
                                        v-if="$store.state.user.ac_update == 't'"
                                        @click="showLock(item.id, item.name, item.new_email, item.phone)">
                                        <v-icon small>mdi-pencil</v-icon>
                                    </v-btn>
                                </template>
                                <span>Update Data Member</span>
                            </v-tooltip>

                            <v-dialog transition="dialog-top-transition" max-width="600" v-model="showDialogUpdate">
                                <!-- <template v-slot:activator="{ on, attrs }">
                            
                            <v-btn
                                color="info"
                                icon
                                v-bind="attrs"
                                v-on="on"
                                v-if="$store.state.user.ac_update == 't'"
                                @click="showLock(item.id,item.name , item.new_email , item.phone)"
                            >
                                <v-icon small>mdi-pencil</v-icon>
                            </v-btn>
                            </template> -->
                                <template v-slot:default="dialog">
                                    <v-card>
                                        <v-toolbar color="success" dark>Form Edit Detail Member</v-toolbar>

                                        <v-layout style="display:none;">

                                            <v-text-field v-model="formLock.userId" label="" hidden>
                                            </v-text-field>

                                        </v-layout>

                                        <v-container>

                                            <v-layout>
                                                <v-flex>
                                                    <v-text-field v-model="formLock.edit_name" label="Name">
                                                    </v-text-field>
                                                </v-flex>
                                            </v-layout>

                                            <v-layout>
                                                <v-flex>
                                                    <v-text-field v-model="formLock.edit_email" label="Email">
                                                    </v-text-field>
                                                </v-flex>
                                            </v-layout>

                                            <v-layout>
                                                <v-flex>
                                                    <v-text-field v-model="formLock.edit_phone" label="Phone">
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

                            <!-- <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="warning" icon v-bind="attrs" v-on="on"
                                        v-if="$store.state.user.ac_delete == 't' && item.verified == 1 && item.is_block == false"
                                        @click="showUnVer(item.id, item.name, item.new_email, item.phone)">
                                        <v-icon small>mdi-block-helper</v-icon>
                                    </v-btn>
                                </template>
                                <span>Unverified User Account</span>
                            </v-tooltip> -->

                            <v-dialog transition="dialog-top-transition" max-width="600" v-model="unverdialog">
                                <!-- <span>Unverified User</span> -->
                                <template v-slot:default="dialog">
                                    <v-card>
                                        <v-toolbar color="success" dark>Unverified User Account</v-toolbar>

                                        <v-container>

                                            <v-layout>
                                                <v-flex>
                                                    Yakin anda akan melakukan Unverified atas user ini? Request
                                                    Verifikasi sebelumnya akan di unverified
                                                </v-flex>
                                            </v-layout>

                                        </v-container>

                                        <v-card-actions class="justify-end">
                                            <v-btn text @click="dialog.value = false">Close</v-btn>
                                            <v-btn color="success" @click="userUnverify(dialog)">Unverified This
                                                Account</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>


                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="#999999" icon v-bind="attrs" v-on="on" v-if="item.is_block == false"
                                        @click="showDetailId(item.id)">
                                        <v-icon small>mdi-block-helper</v-icon>
                                    </v-btn>
                                </template>
                                <span>Suspend User Account</span>
                            </v-tooltip>


                            <v-dialog transition="dialog-top-transition" max-width="600" v-model="suspenddialog">
                                <template v-slot:default="dialog">
                                    <v-card>
                                        <v-toolbar color="error" dark>Suspend User Account </v-toolbar>

                                        <v-layout style="display:none;">

                                            <v-text-field v-model="formLock.userId" label="" hidden>
                                            </v-text-field>

                                        </v-layout>

                                        <v-container>

                                            <v-layout>
                                                <v-flex>
                                                    Yakin anda akan melakukan Suspend atas user ini?
                                                </v-flex>
                                            </v-layout>

                                            <v-layout>
                                                <v-flex>
                                                    <v-text-field v-model="formLock.suspend_reason"
                                                        label="Suspend Reason">
                                                    </v-text-field>
                                                </v-flex>
                                            </v-layout>


                                        </v-container>

                                        <v-card-actions class="justify-end">
                                            <v-btn text @click="dialog.value = false">Close</v-btn>
                                            <v-btn color="error" @click="userSuspend(dialog)">Suspend User
                                                Account</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>

                            <v-dialog transition="dialog-top-transition" max-width="600">
                                <template v-slot:activator="{ on, attrs }">

                                    <v-btn color="success" icon v-bind="attrs" v-on="on" v-if="item.is_block == true"
                                        @click="showDetailId(item.id)">
                                        <v-icon small>mdi-check</v-icon>
                                    </v-btn>

                                </template>

                                <template v-slot:default="dialog">
                                    <v-card>
                                        <v-toolbar color="success" dark>UnSuspend User Account</v-toolbar>

                                        <v-text-field v-model="formLock.userId" label="" hidden>
                                        </v-text-field>

                                        <v-container>

                                            <v-layout>
                                                <v-flex>
                                                    Yakin anda akan melakukan UnSuspend atas user ini?
                                                </v-flex>
                                            </v-layout>

                                            <v-layout>

                                                <v-flex>
                                                    <v-text-field v-model="formLock.suspend_reason"
                                                        label="UnSuspend Reason">
                                                    </v-text-field>
                                                </v-flex>

                                            </v-layout>

                                        </v-container>

                                        <v-card-actions class="justify-end">
                                            <v-btn text @click="dialog.value = false">Close</v-btn>
                                            <v-btn color="success" @click="userUnSuspend(dialog)">UnSuspend User
                                                Account</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>
                            <!-- <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="error"
                        icon
                        @click="cancelTrx(item)"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon small>mdi-block-helper</v-icon>
                    </v-btn>
                    </template>
                    <span>Cancel</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn color="success" icon v-bind="attrs" v-on="on">
                        <v-icon small>mdi-thumb-up-outline</v-icon>
                    </v-btn>
                    </template>
                    <span>Success</span>
                </v-tooltip> -->
                        </template>
                    </v-data-table>
                </v-flex>
            </template>

        </CustomCard>

        <p></p>

        <CustomCard>

            <template v-slot:toolbar>

                <div style="width:100%;">
                    <v-btn color="success" small outlined @click="showList()" v-if="detailsMember.verified == 1">
                        <!-- <v-icon>mdi-chevron-left</v-icon> -->
                        Data Verify
                    </v-btn>

                    <v-btn color="success" small outlined @click="showEdit()"
                        v-if="$store.state.member.member.formStates == false && detailsMember.verified == 1"
                        style="float:right;">
                        <!-- <v-icon>mdi-chevron-left</v-icon> -->
                        <v-icon>mdi-pencil</v-icon> Edit Data Member
                    </v-btn>


                    <v-btn color="success" small outlined @click="showListMember()"
                        v-if="$store.state.member.member.formStates == true" style="float:right;">
                        <!-- <v-icon>mdi-chevron-left</v-icon> -->
                        <v-icon>mdi-chevron-left</v-icon> Back
                    </v-btn>

                    <v-btn color="success" small outlined @click="showList()" v-if="detailsMember.verified == 0">
                        <!-- <v-icon>mdi-chevron-left</v-icon> -->
                        Not Verified
                    </v-btn>
                </div>

            </template>




            <template v-if="detailsMember.verified == 1" v-slot:datatable>

                <template v-if="$store.state.member.member.formStates == true">
                    <v-container>

                        <v-row no-gutters>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>
                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            NIK
                                        </v-col>

                                    </v-row>

                                    <v-row class="" no-gutters>
                                        <v-col class="pa-2 martop-min" outlined tile>
                                            <v-text-field style="display:none;" v-model="searchForm.editId" label="id"
                                                single-line small clearable>
                                            </v-text-field>

                                            <v-text-field v-model="searchForm.editNik" label="" single-line small
                                                clearable>
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-col>

                            <v-col sm="5" md="6">
                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>
                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Provinsi
                                        </v-col>

                                    </v-row>

                                    <v-row class="" no-gutters>
                                        <v-col class="pa-2 martop-min" outlined tile>
                                            <v-autocomplete v-model="searchForm.editProvinsi"
                                                @change="(event) => getWilayah('kabupaten')" single-line
                                                :items="provinsiList" item-text="provinsi" item-value="provinsi"
                                                label="">
                                            </v-autocomplete>
                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-col>
                        </v-row>


                        <v-row no-gutters>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Birth Place
                                        </v-col>

                                    </v-row>

                                    <v-row class="" no-gutters>
                                        <v-col class="pa-2 martop-min" outlined tile>

                                            <v-text-field v-model="searchForm.editBirthPlace"
                                                label="Search By BirthPlace" single-line small clearable>
                                            </v-text-field>

                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-col>

                            <v-col sm="5" md="6">
                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Kabupaten
                                        </v-col>

                                    </v-row>

                                    <v-row class="" no-gutters>
                                        <v-col class="pa-2 martop-min" outlined tile>
                                            <v-autocomplete v-model="searchForm.editKabupaten"
                                                @change="(event) => getWilayah('kecamatan')" :disabled="dis_kab"
                                                :items="kabupatenList" single-line item-text="kabupaten"
                                                item-value="kabupaten" label="">
                                            </v-autocomplete>
                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-col>
                        </v-row>

                        <v-row no-gutters>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Date Of Birth
                                        </v-col>

                                    </v-row>

                                    <v-row class="" no-gutters>
                                        <v-col class="pa-2 martop-min" outlined tile>

                                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                                :return-value.sync="date" single-line transition="scale-transition"
                                                offset-y min-width="auto">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-model="searchForm.date_of_birth" label="BirthDate"
                                                        prepend-icon="mdi-calendar" single-line readonly v-bind="attrs"
                                                        v-on="on" clearable></v-text-field>
                                                </template>
                                                <v-date-picker v-model="searchForm.date" no-title scrollable>
                                                    <v-spacer></v-spacer>
                                                    <v-btn text color="primary" @click="menu = false">
                                                        Cancel
                                                    </v-btn>
                                                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                                                        OK
                                                    </v-btn>
                                                </v-date-picker>
                                            </v-menu>


                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-col>

                            <v-col sm="5" md="6">
                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Kecamatan
                                        </v-col>

                                    </v-row>

                                    <v-row class="" no-gutters>
                                        <v-col class="pa-2 martop-min" outlined tile>
                                            <v-autocomplete v-model="searchForm.editKecamatan" :disabled="dis_kec"
                                                @change="(event) => getWilayah('kelurahan')" single-line
                                                :items="kecamatanList" item-text="kecamatan" item-value="kecamatan"
                                                label="">
                                            </v-autocomplete>
                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-col>
                        </v-row>

                        <v-row no-gutters>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Religion
                                        </v-col>

                                    </v-row>

                                    <v-row class="" no-gutters>
                                        <v-col class="pa-2 martop-min" outlined tile>

                                            <v-autocomplete v-model="searchForm.editReligion" :items="religion"
                                                single-line item-text="text" item-value="value" label="Religion">
                                            </v-autocomplete>

                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-col>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Kelurahan
                                        </v-col>

                                    </v-row>

                                    <v-row class="" no-gutters>
                                        <v-col class="pa-2 martop-min" outlined tile>
                                            <v-autocomplete v-model="searchForm.editKelurahan" :disabled="dis_kel"
                                                single-line :items="kelurahanList" item-text="kelurahan"
                                                item-value="mix_data" label="">
                                            </v-autocomplete>
                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-col>
                        </v-row>


                        <v-row no-gutters>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Gender
                                        </v-col>

                                    </v-row>

                                    <v-row class="" no-gutters>
                                        <v-col class="pa-2 martop-min" outlined tile>

                                            <v-autocomplete v-model="searchForm.editGender" :items="gender" single-line
                                                item-text="text" item-value="value" label="Gender">
                                            </v-autocomplete>

                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-col>

                            <v-col sm="5" md="6">
                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Address
                                        </v-col>

                                    </v-row>

                                    <v-row class="" no-gutters>
                                        <v-col class="pa-2 martop-min" outlined tile>
                                            <v-text-field v-model="searchForm.editAddress" label="Address" single-line
                                                small clearable>
                                            </v-text-field>

                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-col>
                        </v-row>

                        <v-row no-gutters>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>
                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Bank Name
                                        </v-col>
                                    </v-row>

                                    <v-row class="" no-gutters>
                                        <v-col class="pa-2 martop-min" outlined tile>

                                            <v-autocomplete v-model="searchForm.editBankName" :items="bankList"
                                                single-line item-text="bank_name" item-value="bank_id" label="">
                                            </v-autocomplete>

                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-col>

                            <v-col sm="5" md="6">
                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Kode Pos
                                        </v-col>

                                    </v-row>

                                    <v-row class="" no-gutters>
                                        <v-col class="pa-2 martop-min" outlined tile>
                                            <v-text-field v-model="searchForm.editKodePos" label="" single-line small
                                                clearable>
                                            </v-text-field>

                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-col>
                        </v-row>


                        <v-row no-gutters>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Bank Acc. No
                                        </v-col>

                                    </v-row>

                                    <v-row class="" no-gutters>
                                        <v-col class="pa-2 martop-min" outlined tile>

                                            <v-text-field v-model="searchForm.editBankAccNo" label="" single-line small
                                                clearable>
                                            </v-text-field>

                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-col>

                            <v-col sm="5" md="6">
                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Current Provinsi
                                        </v-col>

                                    </v-row>

                                    <v-row class="" no-gutters>
                                        <v-col class="pa-2 font-weight-bold martop-min" outlined tile>

                                            <!-- <v-text-field
                        v-model="searchForm.editCurrProvinsi"
                        label=""
                        single-line
                        small
                        clearable>
                </v-text-field> -->
                                            <v-autocomplete v-model="searchForm.editCurrentProvinsi" single-line
                                                :items="provinsiList" item-text="provinsi" item-value="provinsi"
                                                @change="(event) => getWilayah('currkabupaten')" label="">
                                            </v-autocomplete>

                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-col>
                        </v-row>

                        <v-row no-gutters>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Bank Acc. Holder
                                        </v-col>

                                    </v-row>

                                    <v-row class="" no-gutters>
                                        <v-col class="pa-2 martop-min" outlined tile>

                                            <v-text-field v-model="searchForm.editBankAccHolder"
                                                label="Bank Acc. Holder" single-line small clearable>
                                            </v-text-field>

                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-col>

                            <v-col sm="5" md="6">
                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Current Kabupaten
                                        </v-col>

                                    </v-row>

                                    <v-row class="" no-gutters>
                                        <v-col class="pa-2 martop-min" outlined tile>
                                            <!-- <v-text-field
                        v-model="searchForm.editCurrKabupaten"
                        label=""
                        single-line
                        small
                        clearable>
                </v-text-field> -->

                                            <v-autocomplete v-model="searchForm.editCurrKabupaten"
                                                :disabled="curr_dis_kab" single-line :items="currkabupatenList"
                                                item-text="kabupaten" item-value="kabupaten"
                                                @change="(event) => getWilayah('currkecamatan')" label="">
                                            </v-autocomplete>

                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-col>
                        </v-row>


                        <v-row no-gutters>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Current Kecamatan
                                        </v-col>

                                    </v-row>

                                    <v-row class="" no-gutters>
                                        <v-col class="pa-2 martop-min" outlined tile>

                                            <v-autocomplete v-model="searchForm.editCurrKecamatan" single-line
                                                :items="currkecamatanList" item-text="kecamatan" item-value="kecamatan"
                                                :disabled="curr_dis_kec"
                                                @change="(event) => getWilayah('currkelurahan')" label="">
                                            </v-autocomplete>

                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-col>

                            <v-col sm="5" md="6">
                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Current Kelurahan
                                        </v-col>

                                    </v-row>

                                    <v-row class="" no-gutters>
                                        <v-col class="pa-2 martop-min" outlined tile>

                                            <v-autocomplete v-model="searchForm.editCurrKelurahan" single-line
                                                :items="currkelurahanList" item-text="kelurahan" item-value="mix_data"
                                                :disabled="curr_dis_kel"
                                                @change="(event) => getWilayah('currkelurahan')" label="">
                                            </v-autocomplete>

                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-col>
                        </v-row>

                        <v-row no-gutters>

                            <v-col sm="5" md="12">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Current Address
                                        </v-col>

                                    </v-row>

                                    <v-row class="" no-gutters>
                                        <v-col class="pa-2 martop-min" outlined tile>

                                            <v-text-field v-model="searchForm.editBankCurrentAddress"
                                                :disabled="curr_dis_addr" label="" single-line small clearable>
                                            </v-text-field>

                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-col>

                        </v-row>

                        <v-row no-gutters>

                            <div style="width:100%;">

                                <div style="float:right; margin-left:20px;">
                                    <v-btn color="success" small @click="editVerification()" style="float:right;">
                                        <!-- <v-icon>mdi-chevron-left</v-icon> -->
                                        Submit <v-icon>mdi-chevron-right</v-icon>
                                    </v-btn>
                                </div>

                                <div style="float:left;">
                                    <v-btn color="success" small outlined @click="showListMember()"
                                        style="float:right;">
                                        <!-- <v-icon>mdi-chevron-left</v-icon> -->
                                        <v-icon>mdi-chevron-left</v-icon> Back
                                    </v-btn>
                                </div>

                            </div>

                        </v-row>

                    </v-container>

                </template>

                <template v-if="$store.state.member.member.formStates == false">

                    <v-container>

                        <v-row no-gutters>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            NIK
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.nik }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>


                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Provinsi
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.provinsi }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                        </v-row>

                        <v-row no-gutters>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Birth Place
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.birth_place }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Kabupaten
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.kabupaten }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                        </v-row>


                        <v-row no-gutters>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Date of Birth
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.date_of_birth }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Kecamatan
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.kecamatan }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                        </v-row>

                        <v-row no-gutters>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Religion
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.religion }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Kelurahan
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.kelurahan }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                        </v-row>

                        <v-row no-gutters>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Gender
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.gender }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Address New
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.address }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                        </v-row>

                        <v-row no-gutters>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Bank Name
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.bank_name_detail }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Kode Pos
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.kode_post }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                        </v-row>

                        <v-row no-gutters>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Bank ACC. No.
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.bank_acc_number }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Current Provinsi
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.current_provinsi }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                        </v-row>

                        <v-row no-gutters>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Bank Acc. Holder
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.bank_acc_holder }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Current Kabupaten
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.current_kabupaten }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                        </v-row>

                        <v-row no-gutters>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Buku Tabungan
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            <v-dialog v-model="dialog" width="500">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <!-- <v-btn
                                    color="red lighten-2"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    > -->
                                                    <img v-bind:src="detailsMember.tab_image" style="width:80px;"
                                                        v-bind="attrs" v-on="on" />
                                                    <!-- </v-btn> -->
                                                </template>

                                                <v-card>
                                                    <v-card-title class="text-h5 primary-colors text-light"
                                                        style="color:#FFF;">
                                                        Bank Images
                                                    </v-card-title>

                                                    <v-card-text style="margin-top:20px;">
                                                        <img v-bind:src="detailsMember.tab_image" style="width:100%;" />
                                                    </v-card-text>

                                                    <v-divider></v-divider>

                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <!-- <v-btn
                                        color="primary"
                                        text
                                        @click="dialog = false"
                                    >
                                        Oke
                                    </v-btn> -->
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Current Kecamatan
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.current_kecamatan }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                        </v-row>

                        <v-row no-gutters>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            KTP
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            <v-dialog v-model="dialog" width="500">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <!-- <v-btn
                                    color="red lighten-2"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    > -->
                                                    <img v-bind:src="detailsMember.ktp_image" style="width:80px;"
                                                        v-bind="attrs" v-on="on" />
                                                    <!-- </v-btn> -->
                                                </template>

                                                <v-card>
                                                    <v-card-title class="text-h5 primary-colors text-light"
                                                        style="color:#FFF;">
                                                        KTP Images
                                                    </v-card-title>

                                                    <v-card-text style="margin-top:20px;">
                                                        <img v-bind:src="detailsMember.ktp_image" style="width:100%;" />
                                                    </v-card-text>

                                                    <v-divider></v-divider>

                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <!-- <v-btn
                                        color="primary"
                                        text
                                        @click="dialog = false"
                                    >
                                        Oke
                                    </v-btn> -->
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>

                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Current Kelurahan
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.current_kelurahan }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                        </v-row>

                        <v-row no-gutters>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Foto Selfie
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            <v-dialog v-model="dialog" width="500">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <!-- <v-btn
                                    color="red lighten-2"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    > -->
                                                    <img v-bind:src="detailsMember.slf_image" style="width:80px;"
                                                        v-bind="attrs" v-on="on" />
                                                    <!-- </v-btn> -->
                                                </template>

                                                <v-card>
                                                    <v-card-title class="text-h5 primary-colors text-light"
                                                        style="color:#FFF;">
                                                        Self Images
                                                    </v-card-title>

                                                    <v-card-text style="margin-top:20px;">
                                                        <img v-bind:src="detailsMember.slf_image" style="width:100%;" />
                                                    </v-card-text>

                                                    <v-divider></v-divider>

                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <!-- <v-btn
                                        color="primary"
                                        text
                                        @click="dialog = false"
                                    >
                                        Oke
                                    </v-btn> -->
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Current Address
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.current_address }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                        </v-row>

                        <v-row no-gutters>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <!-- <v-col
                        class="pa-2 font-weight-bold"
                        outlined
                        tile>
                            Birth Place
                        </v-col>

                        <v-col
                        class="pa-2 text-right"
                        outlined
                        tile>
                            {{ detailsMember.new_email }}
                        </v-col> -->

                                    </v-row>

                                </v-col>

                            </v-col>

                            <v-col sm="5" md="6">

                                <v-col class="pa-2" outlined tile>

                                    <v-row no-gutters>

                                        <v-col class="pa-2 font-weight-bold" outlined tile>
                                            Current Kode Pos
                                        </v-col>

                                        <v-col class="pa-2 text-right" outlined tile>
                                            {{ detailsMember.current_kodepost }}
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-col>

                        </v-row>


                    </v-container>

                </template>

            </template>

        </CustomCard>

    </div>
</template>

<script>
import CustomCard from "../../../../components/CustomCard.vue";



export default {
    data() {
        return {
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            modal: false,
            panel: null,
            currentPage: 1,
            decimals: "10.00",
            icons: "chevron-right",
            showDialogUpdate: false,
            unverdialog: false,
            suspenddialog: false,
            dis_kab: true,
            dis_kec: true,
            dis_kel: true,
            curr_dis_kab: true,
            curr_dis_kec: true,
            curr_dis_kel: true,
            curr_dis_prov: true,
            profiles: this.$store.state.auth.profile,
            provinsiList: [],
            kabupatenList: [],
            kecamatanList: [],
            kelurahanList: [],
            currkabupatenList: [],
            currkecamatanList: [],
            currkelurahanList: [],
            IndexKel: "",
            bankList: [],
            detailsMember: "",
            editAct: this.$store.state.member.member.formStates,
            tipe: [],
            menu: null,
            form: {},
            searchForm: {
                member: ''
                // tipe: 'ALL',
                // status: 'ALL',
                // sponsor: ''
            },
            pagination: {},
            formLock: {

            },
            headers: [
                { text: "Name", value: "name" },
                { text: "Email", value: "new_email" },
                { text: "Phone", value: "phone" },
                { text: "Reg Date", value: "verified_date" },
                { text: "E-Ver", value: "em_verified" },
                { text: "M-Ver", value: "verified" },
                { text: "Action", align: "center", value: "action" },
            ],
            gender: [
                { text: "All Gender", value: "" },
                { text: "Laki-Laki", value: "Laki-Laki" },
                { text: "Perempuan", value: "Perempuan" },
                // { text: "Gagal", value: "2" },
            ],
            religion: [
                { text: "All Religion", value: "" },
                { text: "Hindu", value: "Hindu" },
                { text: "Katolik", value: "Katolik" },
                { text: "Kristen", value: "Kristen" },
                { text: "Buddha", value: "Buddha" },
                { text: "Islam", value: "Islam" },
                { text: "Konghucu", value: "Konghucu" }
                // { text: "Gagal", value: "2" },
            ],
            loading: false,
            loadingText: "Loading Data...",
        };
    },
    methods: {
        fetchProv(params) {
            this.$store
                .dispatch("wilayah/fetchWilayah", {
                    find: params,
                })
                .then(() => {
                    this.provinsiList = this.$store.state.wilayah.wilayah.list;
                    //console.log("provlist" ,this.$store.state.wilayah.wilayah.list);
                    //alert("prov list");
                })
                .catch((res) => {
                    console.log("prov", res.response.data.message);
                });
        },
        getIndexKel(index) {
            // alert("index = "+index)
            console.log(index);
        },
        fetchBank(params) {
            this.$store
                .dispatch("bank/fetchBank", {
                    find: params,
                })
                .then(() => {
                    this.bankList = this.$store.state.bank.bank.listBank;
                })
                .catch((res) => {
                    console.log("prov", res.response.data.message);
                });
        },
        fetch() {
            this.loading = true;
            this.loadingtext = 'Loading... Please wait';
            this.$store.commit("main/setLoading", true);
            this.$store
                .dispatch("member/fetchListMemberDetail", {
                    id_member: this.$store.state.member.member.detail,
                })
                .then(() => {
                    //alert("tes-dd");
                    console.log("itemsfetch", this.$store.state.member.member.listDetail[0]);
                    this.$store.commit("main/setLoading", false);
                    this.loading = false;
                    this.loadingtext = '';
                    this.detailsMember = this.$store.state.member.member.listDetail[0];
                })
                .catch((res) => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res.response.data.message);
                    this.loading = false;
                    this.loadingtext = '';
                });
        },
        filterToggle() {
            if (this.panel == null)
                this.panel = [...Array(this.items).keys()].map((k, i) => i);
            else this.panel = null;
        },
        showDetail(item) {
            this.$store.commit("transaction/setMemberPage", "detail");
            this.$store.commit("transaction/setMemberDetail", item);
            //this.detailsName = "New Member";
        },
        showList() {
            this.$store.commit("member/setMemberPage", "list");
            this.$store.state.member.member.is_back = 1;
            //   this.$store.commit("transaction/setMemberDetail", item);
        },
        showEdit() {
            //this.editAct = "form";
            // this.$store.state.member.member.formStates = true;
            // alert(this.$store.state.member.member.formStates);s

            this.searchForm.editNik = this.detailsMember.nik;
            this.searchForm.editId = this.detailsMember.id;
            this.searchForm.editProvinsi = this.detailsMember.provinsi;
            this.searchForm.editKabupaten = this.detailsMember.kabupaten;
            this.searchForm.editKecamatan = this.detailsMember.kecamatan;
            this.searchForm.editKelurahan = this.detailsMember.kelurahan + "#" + this.detailsMember.kode_post;

            this.searchForm.editBirthPlace = this.detailsMember.birth_place;
            this.searchForm.editReligion = this.detailsMember.religion;
            this.searchForm.date_of_birth = this.detailsMember.date_of_birth;
            this.searchForm.editGender = this.detailsMember.gender;
            this.searchForm.editAddress = this.detailsMember.address;
            this.searchForm.editKodePos = this.detailsMember.kode_post;
            this.searchForm.editBankName = this.detailsMember.bank_id;
            this.searchForm.editBankAccNo = this.detailsMember.bank_acc_number;
            this.searchForm.editBankAccHolder = this.detailsMember.bank_acc_holder;
            this.searchForm.editCurrentProvinsi = this.detailsMember.current_provinsi;
            this.searchForm.editCurrKabupaten = this.detailsMember.current_kabupaten;
            this.searchForm.editCurrKecamatan = this.detailsMember.current_kecamatan;
            this.searchForm.editCurrKelurahan = this.detailsMember.current_kelurahan + "#" + this.detailsMember.current_kodepost;
            this.searchForm.editBankCurrentAddress = this.detailsMember.current_address;

            if (this.detailsMember.provinsi != "") {
                this.getWilayah("kabupaten");
            }

            if (this.detailsMember.kabupaten != "") {
                this.getWilayah("kecamatan");
            }

            if (this.detailsMember.kecamatan != "") {
                this.getWilayah("kelurahan");
            }

            if (this.detailsMember.current_provinsi != "") {
                this.getWilayah("currkabupaten");
            }

            if (this.detailsMember.current_kabupaten != "") {
                this.getWilayah("currkecamatan");
            }

            if (this.detailsMember.current_kecamatan != "") {
                this.getWilayah("currkelurahan");
            }

            this.$store.commit("member/setFormSwitch", true);
        },
        showListMember() {
            this.fetch();
            this.$store.commit("member/setFormSwitch", false);
        },
        editVerification: function () {
            this.$store.commit("main/setLoading", true);
            this.$store
                .dispatch("member/editMemberVerification", {
                    updateId: this.profiles.id,
                    userId: this.searchForm.editId,
                    nik: this.searchForm.editNik,
                    provinsi: this.searchForm.editProvinsi,
                    kabupaten: this.searchForm.editKabupaten,
                    kecamatan: this.searchForm.editKecamatan,
                    kelurahan: this.searchForm.editKelurahan,
                    birthplace: this.searchForm.editBirthPlace,
                    religion: this.searchForm.editReligion,
                    birthdate: this.searchForm.date_of_birth,
                    gender: this.searchForm.editGender,
                    address: this.searchForm.editAddress,
                    kodepost: this.searchForm.editKodePos,
                    bankname: this.searchForm.editBankName,
                    bankaccnumber: this.searchForm.editBankAccNo,
                    bankaccholder: this.searchForm.editBankAccHolder,
                    curprovinsi: this.searchForm.editCurrentProvinsi,
                    curkecamatan: this.searchForm.editCurrKecamatan,
                    curkelurahan: this.searchForm.editCurrKelurahan,
                    curkabupaten: this.searchForm.editCurrKabupaten,
                    curaddress: this.searchForm.editBankCurrentAddress
                })
                .then(() => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarSuccess", "Update Data Member Successfull");
                })
                .catch((res) => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res);
                    this.loading = false;
                    this.loadingtext = '';
                });
        },
        getWilayah(value) {

            if (value == "kabupaten") {
                this.dis_kab = false;
            }

            if (value == "kecamatan") {
                this.dis_kec = false;
            }

            if (value == "kelurahan") {
                this.dis_kel = false;
            }

            this.$store
                .dispatch("wilayah/fetchAreaWilayah", {
                    find: value,
                    provinsi: this.searchForm.editProvinsi,
                    kabupaten: this.searchForm.editKabupaten,
                    kecamatan: this.searchForm.editKecamatan,
                    currprovinsi: this.searchForm.editCurrentProvinsi,
                    currkabupaten: this.searchForm.editCurrKabupaten,
                    currkecamatan: this.searchForm.editCurrKecamatan
                })
                .then(() => {

                    if (value == "kabupaten") {
                        this.kabupatenList = this.$store.state.wilayah.wilayah.listKabupaten;
                        this.dis_kab = false;
                    }

                    if (value == "kecamatan") {
                        this.kecamatanList = this.$store.state.wilayah.wilayah.listKecamatan;
                        this.dis_kec = false;
                    }

                    if (value == "kelurahan") {
                        this.kelurahanList = this.$store.state.wilayah.wilayah.listKelurahan;
                        this.dis_kel = false;
                    }

                    if (value == "currkabupaten") {
                        this.currkabupatenList = this.$store.state.wilayah.wilayah.currlistKabupaten;
                        this.curr_dis_kab = false;
                    }

                    if (value == "currkecamatan") {
                        this.currkecamatanList = this.$store.state.wilayah.wilayah.currlistKecamatan;
                        this.curr_dis_kec = false;
                    }

                    if (value == "currkelurahan") {
                        this.currkelurahanList = this.$store.state.wilayah.wilayah.currlistKelurahan;
                        this.curr_dis_kel = false;
                    }

                })
                .catch((res) => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res.response.data.message);
                    this.loading = false;
                    this.loadingtext = '';
                });
        },
        editProfiles: function () {
            this.$store
                .dispatch("member/editProfiles", {
                    userId: this.formLock.userId,
                    edit_name: this.formLock.edit_name,
                    edit_email: this.formLock.edit_email,
                    updateId: this.profiles.id,
                    edit_phone: this.formLock.edit_phone
                })
                .then(() => {
                    //   this.$store.commit("main/setLoading", false);
                    //   this.loading = false;
                    //   this.loadingtext = '';
                    this.fetch();
                    //alert("tes");
                    //dialog.value = false;
                    this.showDialogUpdate = false
                })
                .catch((res) => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res.response.data.message);
                    this.loading = false;
                    this.loadingtext = '';
                });
        },
        userUnverify: function (dialog) {
            this.$store
                .dispatch("member/userUnverify", {
                    userId: this.formLock.userId,
                    updateId: this.profiles.id,
                })
                .then(() => {
                    //   this.$store.commit("main/setLoading", false);
                    //   this.loading = false;
                    //   this.loadingtext = '';
                    this.fetch();
                    dialog.value = false;
                })
                .catch((res) => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res.response.data.message);
                    this.loading = false;
                    this.loadingtext = '';
                });
        },
        userSuspend: function (dialog) {
            this.$store
                .dispatch("member/userSuspend", {
                    userId: this.formLock.userId,
                    updateId: this.profiles.id,
                    suspend_reason: this.formLock.suspend_reason
                })
                .then(() => {
                    //   this.$store.commit("main/setLoading", false);
                    //   this.loading = false;
                    //   this.loadingtext = '';
                    this.formLock.suspend_reason = "";
                    this.fetch();
                    dialog.value = false;
                })
                .catch((res) => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res.response.data.message);
                    this.loading = false;
                    this.loadingtext = '';
                });
        },
        userUnSuspend: function (dialog) {
            this.$store
                .dispatch("member/userUnSuspend", {
                    userId: this.formLock.userId,
                    updateId: this.profiles.id,
                    suspend_reason: this.formLock.suspend_reason
                })
                .then(() => {
                    //   this.$store.commit("main/setLoading", false);
                    //   this.loading = false;
                    //   this.loadingtext = '';
                    this.fetch();
                    this.formLock.suspend_reason = "";
                    dialog.value = false;
                })
                .catch((res) => {
                    this.$store.commit("main/setLoading", false);
                    this.$store.commit("main/setSnackbarFail", res.response.data.message);
                    this.loading = false;
                    this.loadingtext = '';
                });
        },
        showLock: function (userId, member_name, member_email, member_phone) {
            this.formLock.userId = userId
            this.formLock.edit_name = member_name
            this.formLock.edit_email = member_email
            this.formLock.edit_phone = member_phone
            this.showDialogUpdate = true
        },
        showUnVer: function (userId, member_name, member_email, member_phone) {
            this.formLock.userId = userId
            this.formLock.edit_name = member_name
            this.formLock.edit_email = member_email
            this.formLock.edit_phone = member_phone
            this.unverdialog = true
        },
        showDetailId: function (userId) {
            this.formLock.userId = userId
            this.suspenddialog = true
        },
        showExpand: function (element, index) {
            const detailElement = document.getElementById(index);
            if (detailElement.classList.contains('hidden')) {
                element.target.classList.remove("mdi-chevron-right");
                element.target.classList.add("mdi-chevron-down");
                detailElement.classList.remove("hidden");
                //this.icons = "chevron-down";
            }
            else {
                element.target.classList.add("mdi-chevron-right");
                element.target.classList.remove("mdi-chevron-down");
                detailElement.classList.add("hidden");
                //this.icons = "chevron-right";
            }
        },
    },
    mounted() {
        this.fetchProv("");
        this.fetchBank("bank");
        this.$store.commit("member/setFormSwitch", false);
        this.fetch();

        //alert(this.$store.state.user.ac_update);
    },
    //   watch: {
    //     pagination() {
    //         this.loading = true
    //         this.loadingtext = 'Loading... Please wait'
    //         this.fetch()
    //     },
    //     searchSponsor(val) {
    //         val && val !== this.searchForm.sponsor && this.getSponsor(val);
    //     },
    //     searchMember(val) {
    //         val && val !== this.searchForm.member && this.getMember(val);
    //     }
    //   },

    computed: {
        dateRangeText() {
            if (typeof this.form.dates != "undefined") {
                if (this.form.dates.length > 1) {
                    return this.form.dates.join(" ~ ");
                } else {
                    return this.form.dates[0];
                }
            } else {
                return null;
            }
        },
    },
    components: { CustomCard },
};
</script>
