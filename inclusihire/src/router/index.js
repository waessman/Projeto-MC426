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
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/usuarioHome',
    name: 'Home Usuario',
    component: () => import('../views/UsuarioHomeView.vue')
  },
  {
    path: '/cadastro/usuario',
    name: 'Home Usuario',
    component: () => import('../views/CadastroUsuarioView.vue')
  },
  {
    path: '/cadastro/empresa',
    name: 'Home Usuario',
    component: () => import('../views/CadastroEmpresaView.vue')
  },
  {
    path: '/empresaHome',
    name: 'Home Empresa',
    component: () => import('../views/EmpresaHomeView.vue')
  },
  {
    path: '/adicionarProcesso',
    name: 'Nova Vaga',
    component: () => import('../views/AdicionarProcessoView.vue')
  },
  {
    path: '/adicionarProcesso/:id',
    name: 'Nova Vaga',
    component: () => import('../views/AdicionarProcessoEditView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
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
