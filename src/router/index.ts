import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Projetos from "../views/Projetos.vue";
import Dashboard from "../views/Dashboard.vue"
import FormularioProjeto from "../components/FormularioProjeto.vue";
import TelaLogin from "../views/TelaLogin.vue"

const rotas: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/projetos",
    component: Projetos,
    children: [
      {
        path: "",
        name: "Projetos",
        component: Projetos,
      },
      {
        path: "novo",
        name: "Novo Projetos",
        component: FormularioProjeto,
      },
      {
        path: ":id",
        name: "Editar Projetos",
        component: FormularioProjeto,
        props: true, //quando props é true vai pegar o :id e injetedar na viwe como se fosse uma prop do componente
      }
    ],
  },
  {
    path: "/login",
    name: "TelaLogin",
    component: TelaLogin,
  }
];

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

export default roteador;
