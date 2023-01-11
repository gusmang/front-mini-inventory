import request_util from '../util/request'

export function apiFetchList(data) {
    return request_util({
        url: '/supplier/list',
        method: 'POST',
        data: data
    })
}

export function apiEdit(data) {
    return request_util({
        url: '/supplier/update/'+data.id,
        method: 'PUT',
        data: data
    })
}

export function apiAdd(data) {
    return request_util({
        url: '/supplier/add/',
        method: 'POST',
        data: data
    })
}

export function apiDelCat(data) {
    return request_util({
        url: '/supplier/softdelete/'+data.id,
        method: 'DELETE',
        data: data
    })
}

//export default function apiFetchListMember()