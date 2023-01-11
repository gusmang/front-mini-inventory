import request_util from '../util/request'
import request_util_formdata from '../util/requestFormData'

export function apiFetchList(data) {
    return request_util({
        url: '/barang/list',
        method: 'POST',
        data: data
    })
}

export function apiEdit(data) {
    var formData = new FormData();
    
    formData.append("nama_produk", data['nama_produk']);
    formData.append("kode_produk", data['kode_produk']);
    formData.append("id_kategori", data['id_kategori']);
    formData.append("stok", data['stok']);
    formData.append("harga_beli", data['harga_beli']);
    formData.append("harga_jual", data['harga_jual']);
    formData.append("foto_produk", data['foto_produk']);

    return request_util_formdata({
        url: '/barang/update/'+data.id,
        method: 'POST',
        data: data
    })
}

export function apiAdd(data) {
    var formData = new FormData();
    
    formData.append("nama_produk", data['nama_produk']);
    formData.append("kode_produk", data['kode_produk']);
    formData.append("id_kategori", data['id_kategori']);
    formData.append("stok", data['stok']);
    formData.append("harga_beli", data['harga_beli']);
    formData.append("harga_jual", data['harga_jual']);
    formData.append("foto_produk", data['foto_produk']);

    return request_util_formdata({
        url: '/barang/add/',
        method: 'POST',
        data: formData
    })
}

export function apiDelCat(data) {
    return request_util({
        url: '/barang/softdelete/'+data.id,
        method: 'DELETE',
        data: data
    })
}

//export default function apiFetchListMember()