import free_request from './../util/free_request'

export function apiGetOTP(data) {
    return free_request({
        url: 'get-otp',
        method: 'POST',
        data: data
    })
}

export function apiLogin(data) {
    return free_request({
        url: '/login',
        method: 'POST',
        data: data
    })
}