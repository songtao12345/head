import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('views/Login')
const Home = () => import('views/Home')
const Welcome = () => import('views/Welcome')
const Article = () => import('views/childComps/Article')
const Material = () => import('views/childComps/Material')
const Publish = () => import('views/childComps/Publish')
const Comment = () => import('views/childComps/Comment')
const Fans = () => import('views/childComps/Fans')
const Settings = () => import('views/childComps/Settings')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: Welcome
    },{
      path: '/article',
      component: Article
    },{
      path: '/material',
      component: Material
    },{
      path: '/publish',
      component: Publish
    },{
      path: '/comment',
      component: Comment
    },{
      path: '/fans',
      component: Fans
    },{
      path: '/settings',
      component: Settings
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

// 路由导航守卫,判断token是否存在
router.beforeEach((to,from,next) => {
  if(to.path === '/login') return next()
  //获取token值
  let tokenValue = window.sessionStorage.getItem('token')
  if(!tokenValue) return next('/login')
  next()
})



export default router
