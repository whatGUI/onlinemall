import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from "components/common/toast/";

import FastClick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';

Vue.config.productionTip = false

// Import the Auth0 configuration
import { domain, clientId } from "./auth/auth_config";
// Import the auth plugin here
import { Auth0Plugin } from "./auth";

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

// 事件总线
Vue.prototype.$bus = new Vue()
// toast插件
Vue.use(toast)
// 调用fastclick attach函数，启用以解决移动端300ms延迟问题
FastClick.attach(document.body)
// img lazyload
Vue.use(VueLazyLoad, { loading: require('assets/img/common/placeholder.png') })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

