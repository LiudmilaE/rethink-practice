import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Signup from './Signup'
import Login from './Login'
import Profile from './Profile'
import ArticleForm from './ArticleForm'
import { checkUser } from '@/api/auth';

Vue.use(Router)

const router = new Router({
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
      meta: {
				requiresNonAuth: true,
			},
    },
    {
      path: '/login',
      component: Login,
      meta: {
				requiresNonAuth: true,
			},
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
				requiresAuth: true,
			},
    },
    {
			path: '/articles/new',
      component: ArticleForm,
      meta: {
				requiresAuth: true,
			},
		},

  ]
})

//only authorized user can access profile page
router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth) {
		checkUser(router.app.$root);
		if (!router.app.$root.user) {
			return next({
				path: '/login',
				query: {
					//to transform into a valide query value
					redirect: encodeURIComponent(to.fullPath),
				},
			});
		}
	}
	// we must always call next to let the
	// navigation happen
	next();
});

//only guests should access login and signup pages
router.beforeEach((to, from, next) => {
	if (to.meta.requiresNonAuth) {
		checkUser(router.app.$root);
		if (router.app.$root.user) return next('/');
	}
	next();
});

export default router