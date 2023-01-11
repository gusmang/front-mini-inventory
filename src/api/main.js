import request_util from '../util/request'

export function apiGetSidebar(data) {
    return request_util({
        url: 'admin/get-sidebar', 
        method: 'POST',
        data: data
    })
}

export function apiGetSidebarAll(data) {
    return request_util({
        url: 'admin/all-get-sidebar', 
        method: 'POST',
        data: data
    })
}

export function apiSidebarEdit(data) {
    return request_util({
        url: 'admin/edit-get-sidebar', 
        method: 'POST',
        data: data
    })
}

export function apiGetCekAkses(data) {
    return request_util({
        url: 'admin/cekUser-Akses', 
        method: 'POST',
        data: data
    })
}
