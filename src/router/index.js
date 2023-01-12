import Vue from "vue";
//import VueRouter from "vue-router";
import VueRouter  from 'vue-router'
//import createWebHashHistory  from 'vue-router'

import MainLayout from '../views/Main.vue'
import Dashboard from '../views/pages/main.vue'
import Login from '../views/Login.vue'

import KategoriList from '../views/pages/kategori/main.vue'
import SupplierList from '../views/pages/supplier/main.vue'
import BarangList from '../views/pages/barang/main.vue'
import PembelianList from '../views/pages/pembelian/main.vue'

if (!window.VueRouter) Vue.use(VueRouter)

const routes = [
    //Login
    {
        path: '/',
        name: 'Login Admin',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Main',
        component: MainLayout,
        children: [
            {
                path: '/dashboard/main',
                name: 'Main Dashboard',
                component: Dashboard
            },
            {
                path: '/dashboard/kategori',
                name: 'List Kategori Produk',
                component: KategoriList
            },
            {
                path: '/dashboard/supplier',
                name: 'List Supplier Produk',
                component: SupplierList
            },
            {
                path: '/dashboard/barang',
                name: 'List Barang',
                component: BarangList
            },
            {
                path: '/dashboard/pembelian',
                name: 'List Pembelian',
                component: PembelianList
            },
        ]
    }
]

const router = new VueRouter({
    //mode: createWebHashHistory(process.env.API_URL_LOCAL),
    //mode: "hash",
    mode: "hash",
    routes
});

export default router