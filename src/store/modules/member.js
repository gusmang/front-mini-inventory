import { apiFetchListMember , apiEditMember , apiAddMember , apiDelMember } from "../../api/member"


const namespaced = true

const defaultState = () => {
    return {
        main: {
            list: [],
            detail: {},
            search: {},
        },
        member: {
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
            statusList:[
                { text: "All Status", value: "" },
                { text: "Belum Menikah", value: "3" },
                { text: "Menikah", value: "1" },
                { text: "Single", value: "2" },
            ]
        }
    }
}

const state = defaultState()

const mutations = {
    
    setSuccess: (state, payload) => {
        state.member.success = payload
    },
    setMemberDetail: (state, payload) => {
        state.member.detail = payload
    },
    setMemberListDetail: (state, payload) => {
        state.member.listDetail = payload
    },
    setMemberPage: (state, payload) => {
        state.member.page = payload
    },
    setMemberList: (state, payload) => {
        state.member.list = payload
    },
    setMsgSuccess: (state, payload) => {
        state.member.messageInp = payload
    },
}

const actions = {
    fetchListMember({ commit }, payload) {
        return new Promise((resolve, reject) => {
            apiFetchListMember(payload)
                .then((res) => {

                    if (res.status == 200) {
                        commit('setMemberList', res.data.data)

                        state.member.total = res.data.total

                        resolve(res)
                    }
                    reject(res)
                }).catch(res => reject(res))
        })
    },
    editMember({ commit }, payload) {
        return new Promise((resolve, reject) => {
            apiEditMember(payload)
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
    addMember({ commit }, payload) {
        return new Promise((resolve, reject) => {
            apiAddMember(payload)
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
    apidelMember({ commit }, payload) {
        return new Promise((resolve, reject) => {
            apiDelMember(payload)
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