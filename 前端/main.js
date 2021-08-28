import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入全局样式
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(elementui);

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'
//没有此设置，后端就无法将数据保存到cookie中，前端设置了这个，后端的跨域设置就不能是res.header('Access-Control-Allow-Origin', '*') 
//要改为res.header('Access-Control-Allow-Origin', 'http://localhost:8080') 
axios.defaults.withCredentials = true

// request 拦截器中，请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
// axios.interceptors.request.use(config => {
//   console.log(config)
//   // 为请求头对象，添加token验证的Authorization字段
//   config.headers.token = window.sessionStorage.getItem('token')
//   // 在最后必须 return config
//   return config
// })
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
