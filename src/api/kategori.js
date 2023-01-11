import request_util from '../util/request'

export function apiFetchList(data) {
    return request_util({
        url: '/kategori/list',
        method: 'POST',
        data: data
    })
}

export function apiFetchListAll(data) {
    return request_util({
        url: '/kategori/all_list',
        method: 'POST',
        data: data
    })
}


export function apiEdit(data) {
    return request_util({
        url: '/kategori/update/'+data.id,
        method: 'PUT',
        data: data
    })
}

export function apiAdd(data) {
    return request_util({
        url: '/kategori/add/',
        method: 'POST',
        data: data
    })
}

export function apiDelCat(data) {
    return request_util({
        url: '/kategori/softdelete/'+data.id,
        method: 'DELETE',
        data: data
    })
}

//export default function apiFetchListMember()