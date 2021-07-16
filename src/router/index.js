import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/Login.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.access_token) next('/')
      else next()
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( '../views/Register.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.access_token) next('/')
      else next()
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import( '../views/ShoppingCart.vue'),
    meta:{requiresAuth: true}
  },
  {
    path: '/user',
    name: 'User',
    component: () => import( '../views/User.vue'),
    meta:{requiresAuth: true}
  },
  {
    path: '/tag/:name',
    name: 'Tag',
    component: Home,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) =>{
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('access_token')) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
