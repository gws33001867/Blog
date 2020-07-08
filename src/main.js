import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'
import store from './store'
import router from './router'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'mavon-editor/dist/markdown/github-markdown.min.css'
import axios from 'axios'
import vueAxios from 'vue-axios'
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import infiniteScroll from "vue-infinite-scroll"
import myPlugin from '@/plugin.js'

Vue.config.productionTip = false


Vue.use(Antd)
Vue.use(mavonEditor)
Vue.use(vueAxios, axios)
Vue.use(infiniteScroll)
Vue.use(myPlugin)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')