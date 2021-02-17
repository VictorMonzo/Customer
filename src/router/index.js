import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginRegister from '../views/LoginRegister.vue'
import Products from '../views/Products.vue'
import Profile from '../views/Profile.vue'
import Orders from '../views/Orders.vue'
import CompNotFound from '../views/CompNotFound.vue'

Vue.use(VueRouter)

const isAuthenticated = (to, from, next) => {
  if(sessionStorage.token) {
    next();
    return;
  }
  next('/autenticacion');
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/autenticacion',
    name: 'LoginRegister',
    component: LoginRegister
  },
  {
    path: '/productos',
    name: 'Products',
    component: Products,
    beforeEnter: isAuthenticated
  },
  {
    path: '/pedidos',
    name: 'Orders',
    component: Orders,
    beforeEnter: isAuthenticated
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: isAuthenticated
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },

  {
    path: '/not-found',
    name: '404',
    component: CompNotFound,
  },
  {
    path: '*',
    redirect: {
      name: '404',
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router