import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload  from 'vue-lazyload'//图片懒加载
import VueCookie from 'vue-cookie'//cookie
Vue.use(VueLazyload ,{
  loading:"/imgs/loading-svg/loading-bars.svg"
})
Vue.use(VueCookie)
// import env from './env'
Vue.config.productionTip = false  //开发模式默认关闭
Vue.use(VueAxios,axios)//VueAxios前面 axios依赖VueAxios，安装其他插件的时候，可以直接在 main.js 中引入并使用 Vue.use()来注册，但是 axios并不是vue插件，所以不能 使用Vue.use()，所以只能在每个需要发送请求的组件中即时引入。
// Vue.prototype.axios = axios
// Vue.prototype.VueAxios=VueAxios
// axios.defaults.baseURL="http://test-www.imooc.com/api"//默认请求地址
// axios.defaults.baseURL=env.baseURL//默认请求地址
// axios.defaults.baseURL=" https://www.easy-mock.com/mock/5eb00394a9af2438fc69f153/api"//easymock
// console.log(axios.defaults.baseURL);
const mock=false; //mock开关
if (mock) {
    require("./mock/api")
}
axios.defaults.baseURL="/api"//默认请求地址
axios.defaults.timeout=8000//默认超时时间
axios.interceptors.response.use((response)=>{//接口错误拦截
  let res=response.data;
  let path=location.hash;
  if(res.status==0){
    return res.data//成功
  }else if (res.status==10) {//未登录
    if (path!="#/index") {
      window.location.href="/#/login"//不可以用$router.push,不在首页必须要登录
    }
    return Promise.reject(res)
  }else{
  alert(res.msg);
  return Promise.reject(res)
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
