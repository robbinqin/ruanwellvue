// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css'

//导入请求库
import {getRequest} from './utils/api'
import {postRequest} from './utils/api'
import {deleteRequest} from './utils/api'
import {putRequest} from './utils/api'
import {initMenu} from './utils/utils'
import './utils/filter_utils'
import './lib/sockjs'
import './lib/stomp'

Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;

Vue.use(ElementUI);

//路由跳转之前会触发
//to : 目标地址
//from: 从哪来
//next： 这是一个函数
router.beforeEach((to, from, next) => {
  if (to.path == "/") {
    next();
  } else {
    var user = window.localStorage.getItem("user");
    if (user == null || user == '') {
      //去登录
      next({path: "/"})
    } else {
      initMenu(router,store);
      next();
    }
  }
})

Vue.config.productionTip = false
window.bus = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
