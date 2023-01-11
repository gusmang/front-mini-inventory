const { default: axios } = require("axios");
const { apiUrl } = require("../api/apiUrl")

const Token = "inv-dashboard"

//dinaran url
const service = axios.create({
    baseURL: apiUrl,
    timeout: 1000000,
    method: 'POST',
    withCredentials: false
});
//service.defaults.withCredentials = true

service.interceptors.request.use(
    (config) => {
        if (localStorage.getItem(Token)) {
            config.headers['Authorization'] = `Bearer ` + localStorage.getItem(Token)
        }
        // config.headers['content-Type'] = 'multipart/form-data'
        // config.headers['responseHeader'] = ["Content-Type"]
        // config.headers['origin'] = '*'
        // config.headers['maxAgeSeconds'] = 1800
        // config.headers['method'] =  ["GET", "POST", "PUT", "OPTIONS", "DELETE"]
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    (response) => {
        const res = response.data
        return res
    },
    (error) => {
        console.log(error)
        if (error.response.status === 401) {
            //alert("tes1"); 
            //window.location.href = '/'
        }
        return Promise.reject(error)
    }
)

export default service