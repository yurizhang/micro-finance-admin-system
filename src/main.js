import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-default/index.css';    // 默认主题
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css.css'


import "babel-polyfill";

Vue.use(ElementUI);

axios.defaults.headers.common['TN-REQ-DATA-TYPE'] = 'json/text';
Vue.prototype.$axios = axios;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');