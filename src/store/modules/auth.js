import { apiGetOTP, apiLogin } from "../../api/auth"
import router from "../../router"
import { getToken, setProfile, setToken , getProfile , logOut } from "../../util/auth"

const namespaced = true

const defaultState = () => {
    return {
        messageLogin: "",
        token: getToken(),
        isLogin: false,
        isAdmin: false,
        profile:getProfile()
    }
}

const state = defaultState()

const mutations = {
    setLoginStatus: (state, payload) => {
        state.isLogin = payload
    },
    setIsAdmin: (state, payload) => {
        state.isAdmin = payload
    }
}

const actions = {
    tryAutoLogin() {
        const token = localStorage.getItem('token')
        if (!token) {
            return
        }

        const user = localStorage.getItem('user')
        if(user) {
            router.push({name: "Main Dashboard"})
        }
    },
    logout({commit}) {
        logOut();
        commit('setIsAdmin', false);
        router.push({name: "Login Admin"})
        //}
    },
    getOTP({commit}, payload) {
        return new Promise((resolve, reject) => {
                apiGetOTP(payload)
                    .then(res => {
                        if (res.status == 200) {
                            commit('setIsAdmin', true)
                            resolve(res)
                        } else {
                            reject(res)
                        }
                    })
                    .catch(res => {
                        commit('setIsAdmin', false)
                        reject(res)
                    })
            }
        )
    },
    userLogin({commit}, payload) {
        return new Promise((resolve, reject) => {
            apiLogin(payload)
                .then(res => {
                    if (res.status == 200) {
                        commit('setLoginStatus', true)
                        setToken(res.token)
                        setProfile(res.user)
                        resolve(res)
                    }
                    reject(res)
                }).catch(res => reject(res))
        })
    }
}

export default {
    namespaced,
    state,
    mutations,
    actions
}