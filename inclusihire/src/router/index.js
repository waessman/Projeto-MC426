import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('../views/CadastroView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  //TODO
  //Implementar método para verificar sessão do usuário, se ainda está logado
  // verificarSessao()
  console.log(router.resolve(to.path).route)
  if(router.resolve(to.path).route.matched.length == 0)
    next("/")
  
  next()
})

const onError = (e) => {
  if (e.name !== 'NavigationDuplicated') throw e
}

// keep original function
const _push = router.__proto__.push
// then override it
router.__proto__.push = function push (...args) {
  try {
    const op = _push.call(this, ...args)
    if (op instanceof Promise) op.catch(onError)
    return op
  } catch (e) {   
    onError(e)
  }
}

export default router
