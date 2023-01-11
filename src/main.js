import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import RichTextEditor from 'rich-text-editor-vuetify'
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)
Vue.use(RichTextEditor)

import JsonExcel from "vue-json-excel";
 
Vue.component("downloadExcel", JsonExcel);
Vue.component('apexchart', VueApexCharts)

Vue.use(require('vue-moment'));

Vue.config.productionTip = false


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')


