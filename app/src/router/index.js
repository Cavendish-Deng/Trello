import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const Home = () => import('../views/Home.vue')
const Register = () => import('../views/Register.vue')
const Login = () => import('../views/Login.vue')
const Card = () => import('../views/Card.vue')
const Board = () => import('../views/Board.vue')
const NotFound = () => import('../views/NotFound.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // 路由鉴权
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/board/:id(\\d+)',
    name: 'Board',
    component: Board,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'list/:listId(\\d+)/card/:cardId(\\d+)',
        name: 'Card',
        component: Card
      }
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

store.commit('user/initUserInfo')
router.beforeEach((to, from, next) => {
  // 如果没已经鉴权，但没登录
  if (
    to.matched.some(matched => matched.meta.requiresAuth)
    && 
    !store.state.user.info
  ) {
    next({
      name: 'Login'
    })
  } else {
    next()
  }
})

export default router
