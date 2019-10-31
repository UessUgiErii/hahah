import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'
import {getToken} from './api/apis'
import './assets/styles/common.css'
import 'normalize.css' //引入全局重置样式
import 'element-ui/lib/theme-chalk/index.css'

// const originalPush = router.prototype.push
// router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
	router.beforeEach((to,from,next)=>{
    if(to.path != '/'){
       // 如果不是登录页面,就要开启token验证, 判断登录状态在决定是否跳转
       getToken(localStorage.token).then( (res) =>{
          if(res.data == 'timeout'){
            next('/')
          }else{
            //在登录状态 下一步
            next()
          }
       })
    }else{
      //在登录状态 下一步
      next();
    }
  })
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router:router,
  store,
  render: h => h(App),
}).$mount('#app')



