import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Signup from './Signup'
import Login from './Login'
import Profile from './Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/signup',
      component: Signup,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/profile',
      component: Profile,
    }

  ]
})
