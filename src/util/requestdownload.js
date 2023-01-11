const { default: axios } = require("axios");
const { apiUrl } = require("../api/apiUrl")

const Token = "din-dashboard"

const service = axios.create({
    baseURL: apiUrl,
    timeout: 1000000,
    responseType: 'blob'
})

service.interceptors.request.use(
    (config) => {
        if (localStorage.getItem(Token)) {
            config.headers['Authorization'] = `Bearer ` + localStorage.getItem(Token)
        }
        
        config.headers['content-Type'] = 'multipart/form-data'
        return config
    },
    (error)=> {
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
           //alert("tes2"); 
           window.location.href = '/'
        }
        return Promise.reject(error)
    }
)

export default service