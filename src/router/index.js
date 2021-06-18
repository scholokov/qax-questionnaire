import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/test/:slug',
    name: 'test',
    component: () => import(/* webpackChunkName: "about" */ '../views/Test.vue')
  },
  {
    path: '/area',
    name: 'area',
    component: () => import('../views/Area.vue')
  },
  {
    path: '/newuser',
    name: 'newuser',
    component: () => import('../views/NewUser.vue')
  },
  {
    path: '/newtest',
    name: 'newtest',
    component: () => import('../views/NewTest.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../views/Logout.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
