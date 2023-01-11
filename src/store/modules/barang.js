import { apiFetchList , apiEdit , apiAdd , apiDelCat } from "../../api/barang"


const namespaced = true

const defaultState = () => {
    return {
        main: {
            list: [],
            detail: {},
            search: {},
        },
        attributes: {
            list: [],
            detail: {},
            totalVerify: [],
            dialogAdd:false,
            messageInp: "",
            DetailMember:"",
            pageMember:1,
            total: 10,
            is_back: 0,
            paging_page: 1,
            titlestab: "",
            indexRank: 1,
            page: "list",
            success: "",
        },
        searchForm:{
            name:""
        },
        addForm:{
            kode:"",
            name:"",
            kategori:"",
            stok:"",
            hargabeli:"",
            hargajual:"",
            files:""
        },
        editForm:{
            id:"",
            kode:"",
            name:"",
            kategori:"",
            stok:"",
            hargabeli:"",
            hargajual:"",
            files:""
        }
    }
}

const state = defaultState()

const mutations = {
    
    setSuccess: (state, payload) => {
        state.attributes.success = payload
    },
    setMemberDetail: (state, payload) => {
        state.attributes.detail = payload
    },
    setMemberListDetail: (state, payload) => {
        state.attributes.listDetail = payload
    },
    setMemberPage: (state, payload) => {
        state.attributes.page = payload
    },
    setMemberList: (state, payload) => {
        state.attributes.list = payload
    },
    setMsgSuccess: (state, payload) => {
        state.attributes.messageInp = payload
    },
}

const actions = {
    fetchList({ commit }, payload) {
        return new Promise((resolve, reject) => {
            apiFetchList(payload)
                .then((res) => {

                    if (res.status == 200) {
                        commit('setMemberList', res.data)

                        state.attributes.total = res.total

                        resolve(res)
                    }
                    reject(res)
                }).catch(res => reject(res))
        })
    },
    update({ commit }, payload) {
        return new Promise((resolve, reject) => {
            apiEdit(payload)
                .then((res) => {

                    if (res.status == 200) {
                        commit('setSuccess', "Success");
                        commit('setMsgSuccess', res.message);

                        resolve(res)
                    }
                    reject(res)
                }).catch(res => reject(res))
        })
    },
    add({ commit }, payload) {
        return new Promise((resolve, reject) => {
            apiAdd(payload)
                .then((res) => {

                    if (res.status == 200) {
                        commit('setSuccess', "Success");
                        commit('setMsgSuccess', res.message);

                        resolve(res)
                    }
                    reject(res)
                }).catch(res => reject(res))
        })
    },
    delete({ commit }, payload) {
        return new Promise((resolve, reject) => {
            apiDelCat(payload)
                .then((res) => {

                    if (res.status == 200) {
                        commit('setSuccess', "Success");
                        commit('setMsgSuccess', res.message);

                        resolve(res)
                    }
                    reject(res)
                }).catch(res => reject(res))
        })
    },
}

export default {
    namespaced, state, mutations, actions
}