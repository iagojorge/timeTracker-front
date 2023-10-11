import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Projetos from "../views/Projetos.vue";
import Dashboard from "../views/Dashboard.vue"
import FormularioProjeto from "../components/FormularioProjeto.vue";
import TelaLogin from "../views/TelaLogin.vue"
import Layout from "@/views/Layout.vue"

const rotas: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout, 
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true },
      },
      {
        path: 'projetos',
        component: Projetos,
        children: [
          {
            path: '',
            name: 'Projetos',
            component: Projetos,
          },
          {
            path: 'novo',
            name: 'Novo Projetos',
            component: FormularioProjeto,
          },
          {
            path: ':id',
            name: 'Editar Projetos',
            component: FormularioProjeto,
            props: true,
          },
        ],
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/login',
    name: 'TelaLogin',
    component: TelaLogin,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

// Guarda de navegação para proteger rotas que requerem autenticação
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.matched.some((route) => route.meta.requiresAuth)) {
    // Rota requer autenticação
    if (!token) {
      // Redireciona para a tela de login se não houver token
      next('/login');
    } else {
      // Continua a navegação
      next();
    }
  } else {
    // Rota não requer autenticação
    next();
  }
});

export default router;


