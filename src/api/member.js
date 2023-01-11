import request_util from '../util/free_request'

export function apiFetchListMember(data) {
    return request_util({
        url: '/show-input',
        method: 'POST',
        data: data
    })
}

export function apiEditMember(data) {
    return request_util({
        url: '/update-input',
        method: 'POST',
        data: data
    })
}

export function apiAddMember(data) {
    return request_util({
        url: '/add-input',
        method: 'POST',
        data: data
    })
}

export function apiDelMember(data) {
    return request_util({
        url: '/softdelete-member',
        method: 'POST',
        data: data
    })
}

//export default function apiFetchListMember()