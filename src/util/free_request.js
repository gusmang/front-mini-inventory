const { default: axios } = require("axios");
const { apiUrl } = require("../api/apiUrl")
//import store from '../store'

//utils
const service = axios.create({
    baseURL: apiUrl,
    timeout: 100000,
    // proxy: {
    //     host: 'kost.dinaran-gold.com',
    //     port: 443
    // },
    // headers : {
    //     'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    // },
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json',
    //   },
    withCredentials: false,
})

service.interceptors.request.use(
    (config) => {
        // store.commit('setIsAdmin', true)
        //store.isAdmin = true
        // config.headers['content-Type'] = 'multipart/form-data'
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    (response) => {
        // store.commit('setIsAdmin', true)
        //store.isAdmin = true
        const res = response.data
        return res
    },
    (error) => {

        return Promise.reject(error)
    }
)

export default service