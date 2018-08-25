import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Chat from '@/components/chat/Chat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      hidden: true
    }, {
      path: '/home',
      name: 'Home',
      component: Home,
      hidden: true,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/home',
      name: 'Home',
      component: Home,
      hidden: true,
      children: [
        {
          path: '/chat',
          name: '在线聊天',
          component: Chat,
          hidden: true,
          meta: {
            requireAuth: true
          }
        }
      ],
      meta: {
        requireAuth: true
      }
    }
  ]
})
