import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import localStorage from 'localstorage'

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
    path: '/AdicionarProcesso',
    name: 'Nova Vaga',
    component: () => import('../views/AdicionarProcessoView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {


  if(to.path == "/forceLogin"){

    var tokenDate = new Date()
    tokenDate.setDate(tokenDate.getDate() + 1)
    var obj = {
      expirationDate: tokenDate,  
      userType: 1
    }
    localStorage.token = JSON.stringify(obj)
    next("/")

  }

  //TODO
  //Implementar método para verificar sessão do usuário, se ainda está logado
  // verificarSessao()
  //console.log(router.resolve(to.path).route)
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
