import { apiGetSidebar , apiGetSidebarAll , apiSidebarEdit , apiGetCekAkses } from "../../api/main"
import { getProfile } from "../../util/auth"

const namespaced = true

const defaultState = () => {
    return {
        profile: {},
        sidebar: [],
        sidebarall:[],
        sidebaredit:[],
        sidebararrays:[],
        sidebarcounts:[],
        sidebarcountstmp:[],
        cekAkses:0,
        ac_read:"",
        ac_write:"",
        ac_update:"",
        ac_delete:"",
    }
}

const state = defaultState()

const mutations = {
    setProfile: (state, payload) => {
        state.profile = payload
    },
    setSidebar: (state, payload) => {
        state.sidebar = payload
    },
    setSidebarAll: (state, payload) => {
        state.sidebarall = payload
    },
    setSidebarEdit: (state, payload) => {
        state.sidebaredit = payload
    },
    setSidebarArrays: (state, payload) => {
        state.sidebararrays = payload
    },
    setSidebarCounts: (state, payload) => {
        state.sidebarcounts = payload
    },
    setSidebarCountsTmp: (state, payload) => {
        state.sidebarcountstmp = payload
    },
    setCekAkses: (state, payload) => {
        state.cekAkses = payload
    },
    setAcRead: (state, payload) => {
        state.ac_read = payload
    },
    setAcWrite: (state, payload) => {
        state.ac_write = payload
    },
    setAcDelete: (state, payload) => {
        state.ac_delete = payload
    },
    setAcUpdate: (state, payload) => {
        state.ac_update = payload
    },
}

const actions = {
    getProfile({commit}) {
        commit('setProfile', getProfile())
    },
    getSidebar({ commit }, payload) {
        return new Promise((resolve, reject) => {
            apiGetSidebar(payload)
                .then((res) => {
                    if (res.status == 200) {
                        commit('setSidebar', res.message)
                        console.log("sidebars" , res.message);
                        resolve(res)
                    }
                    reject(res)
                }).catch(res => reject(res))
        })
    },
    cekAkses({ commit }, payload) {
        return new Promise((resolve, reject) => {
            apiGetCekAkses(payload)
                .then((res) => {
                    if (res.status == 200) {
                        commit('setCekAkses', res.access);

                        commit('setAcRead' , res.read);
                        commit('setAcWrite' , res.write);
                        commit('setAcDelete' , res.delete);
                        commit('setAcUpdate' , res.update);
                        //console.log("sidebars" , res.message);
                        resolve(res)
                    }
                    reject(res)
                }).catch(res => reject(res))
        })
    },
    getSidebarAll({commit}) {
        return new Promise((resolve, reject) => {
            apiGetSidebarAll()
                .then((res) => {
                    if (res.status == 200) {
                        commit('setSidebarAll', res.message);
                        
                        
                        //console.log("sidebars" , res.message);
                        resolve(res)
                    }
                    reject(res)
                }).catch(res => reject(res))
        })
    },
    getSidebarEdit({commit}, payload) {
        return new Promise((resolve, reject) => {
            apiSidebarEdit(payload)
                .then((res) => {
                    if (res.status == 200) {
                        commit('setSidebarEdit', res.message)
                        commit('setSidebarArrays' , res.arr_modul);
                        commit('setSidebarCounts' , res.arr_jml);
                        commit('setSidebarCountsTmp' , res.arr_jml_tmp);
                        //let arr_all = res.arr_modul.split(",");
                        //alert(res.arr_modul[0]);
                        //console.log("sidebars" , res.message);
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