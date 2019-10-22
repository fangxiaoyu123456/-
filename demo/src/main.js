// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//axios
import axios from 'axios'
Vue.prototype.$axios = axios
//响应拦截
axios.interceptors.response.use(config => {
    console.log('====响应拦截====')
    console.log(config)
    if(config.data.code==-1){
        router.replace('/login')
        return
    }
    return config
});

Vue.config.productionTip = false
//引入过滤器
import filter from './filter'
for(var i in filter){
    Vue.filter(i,filter[i])
}
//公共组件
import commonCom from './components/index'
for(var i in commonCom){
    Vue.component(i,commonCom[i])
}
//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//引入重置reset.css
import './assets/css/reset.css'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
