const namespaced = true

const defaultState = () => {
    return {
        snackbar: {
            success: false,
            fail: false,
            message: ""
        },
        sidebar:{
            item:[
                {"id":1,"parent":0,"module":"Dashboard","icon":"mdi-view-dashboard","active":false,"to":"dashboard"},
                {"id":2,"parent":0,"module":"Kategori","icon":"mdi-view-list","active":false,"to":"kategori", 
                    "children":[
                        {"id":7,"parent":1,"module":"List","icon":"mdi-chart-box-outline","active":false,"to":"kategori","counts":0}
                    ]
                },
                {"id":3,"parent":0,"module":"Supplier","icon":"mdi-chart-line","active":false,"to":"supplier",
                    "children":[
                        {"id":8,"parent":1,"module":"List","icon":"mdi-chart-box-outline","active":false,"to":"supplier","counts":0}
                    ]
                },
                {"id":4,"parent":0,"module":"Barang","icon":"mdi-view-list","active":false,"to":"barang",
                    "children":[
                        {"id":9,"parent":1,"module":"List","icon":"mdi-chart-box-outline","active":false,"to":"barang","counts":0}
                    ]
                },
                {"id":5,"parent":0,"module":"Pembelian","icon":"mdi-gold","active":false,"to":"pembelian"},
                {"id":6,"parent":0,"module":"Penjualan","icon":"mdi-cash-check","active":false,"to":"penjualan"},
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
    }
}

const actions = {}

export default {
    namespaced,
    state,
    mutations,
    actions
}