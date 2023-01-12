import { apiFetchList  } from "../../api/main"

const namespaced = true

const defaultState = () => {
    return {
        snackbar: {
            success: false,
            fail: false,
            message: ""
        },
        dashboard:{
            list:[],
            transaksibuy:[],
            transaksisell:[]
        },
        sidebar:{
            item:[
                {"id":1,"parent":0,"module":"Dashboard","icon":"mdi-view-dashboard","active":false,"to":"dashboard",
                    "children":[
                        {"id":7,"parent":1,"module":"List","icon":"mdi-chart-box-outline","active":false,"to":"main","counts":0}
                    ]
                },
                {"id":2,"parent":0,"module":"Kategori","icon":"mdi-view-list","active":false,"to":"kategori", 
                    "children":[
                        {"id":8,"parent":1,"module":"List","icon":"mdi-chart-box-outline","active":false,"to":"kategori","counts":0}
                    ]
                },
                {"id":3,"parent":0,"module":"Supplier","icon":"mdi-chart-line","active":false,"to":"supplier",
                    "children":[
                        {"id":9,"parent":1,"module":"List","icon":"mdi-chart-box-outline","active":false,"to":"supplier","counts":0}
                    ]
                },
                {"id":4,"parent":0,"module":"Barang","icon":"mdi-view-list","active":false,"to":"barang",
                    "children":[
                        {"id":10,"parent":1,"module":"List","icon":"mdi-chart-box-outline","active":false,"to":"barang","counts":0}
                    ]
                },
                {"id":5,"parent":0,"module":"Pembelian","icon":"mdi-gold","active":false,"to":"pembelian", 
                    "children":[
                        {"id":11,"parent":1,"module":"List","icon":"mdi-chart-box-outline","active":false,"to":"pembelian","counts":0},
                        {"id":12,"parent":1,"module":"Tambah","icon":"mdi-chart-box-outline","active":false,"to":"pembelian","counts":0}
                    ]
                },
                {"id":6,"parent":0,"module":"Penjualan","icon":"mdi-cash-check","active":false,"to":"penjualan", 
                    "children":[
                        {"id":13,"parent":1,"module":"List","icon":"mdi-chart-box-outline","active":false,"to":"penjualan","counts":0},
                        {"id":14,"parent":1,"module":"Tambah","icon":"mdi-chart-box-outline","active":false,"to":"pembelian","counts":0}
                    ]
                },
            ]
        },
        loading: false,
        drawer: false,
    }
}

const state = defaultState()
const mutations = {
    setSnackbarSuccess: (state, payload) => {
        state.snackbar.success = !state.snackbar.success
        state.snackbar.message = payload
    },
    setSnackbarFail: (state, payload) => {
        state.snackbar.fail = !state.snackbar.fail
        state.snackbar.message = payload
    },
    setLoading: (state) => {
        state.loading = !state.loading
    },
    setDrawer: (state) => {
        state.drawer = !state.drawer
    },
    setListTrans: (state,payload) => {
        state.dashboard.list = payload
    },
    setListPembelian: (state,payload) => {
        state.dashboard.transaksibuy = payload
    },
    setListPenjualan: (state,payload) => {
        state.dashboard.transaksisell = payload
    }
}

const actions = {
    apiHitDataTransChart({ commit }, payload) {
        return new Promise((resolve, reject) => {
            apiFetchList(payload)
                .then((res) => {

                    if (res.status == 200) {
                        commit('setListTrans', res.data)
                        commit('setListPembelian' , res.pembelian)
                        commit('setListPenjualan' , res.penjualan)

                        resolve(res)
                    }
                    reject(res)
                }).catch(res => reject(res))
        })
    },
}

export default {
    namespaced,
    state,
    mutations,
    actions
}