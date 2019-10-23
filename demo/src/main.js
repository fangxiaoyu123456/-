// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//vuex
import store from './store'

//axios
import axios from 'axios'
Vue.prototype.$axios = axios

//响应拦截
axios.interceptors.response.use(config => {
  console.log(config)
  if (config.data.code == -1) {
    router.replace('/login')
    return
  }
  return config
});

Vue.config.productionTip = false

//引入过滤器
import filter from './filter'
for (var i in filter) {
  Vue.filter(i, filter[i])
}

//公共组件
import commonCom from './components/index'
for (var i in commonCom) {
  Vue.component(i, commonCom[i])
}


//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入重置reset.css
import './assets/css/reset.css'
//路由拦截
router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    next()
    return
  }
  if (to.path == '/index/manage') {
    if (sessionStorage.getItem('isType') == 0) {
      next()
    } else {
      next('/login')
    }
    return
  }
  if (sessionStorage.getItem('isType') == undefined) {
    next('/login')
    return
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
