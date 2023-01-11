import { apiFetchList , apiEdit , apiAdd , apiDelCat , apiFetchListAll } from "../../api/kategori"


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
            alllist: [],
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
            name:""
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
    setcatList: (state, payload) => {
        state.attributes.alllist = payload
    }
}

const actions = {
    fetchList({ commit }, payload) {
        return new Promise((resolve, reject) => {
            apiFetchList(payload)
                .then((res) => {

                    if (res.status == 200) {
                        commit('setMemberList', res.data.data)

                        state.attributes.total = res.data.total

                        resolve(res)
                    }
                    reject(res)
                }).catch(res => reject(res))
        })
    },
    fetchListAll({ commit }, payload) {
        return new Promise((resolve, reject) => {
            apiFetchListAll(payload)
                .then((res) => {

                    if (res.status == 200) {
                        commit('setcatList', res.data)

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