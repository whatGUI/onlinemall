import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from "components/common/toast/";

import FastClick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';

Vue.config.productionTip = false


// 事件总线
Vue.prototype.$bus = new Vue()
// toast插件
Vue.use(toast)
// 调用fastclick attach函数，启用以解决移动端300ms延迟问题
FastClick.attach(document.body)
// img lazyload
Vue.use(VueLazyLoad,{loading:require('assets/img/common/placeholder.png')})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

