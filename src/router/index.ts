import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tarefas from "../views/Tarefas.vue";
import Projetos from "../views/Projetos.vue";
import FormularioProjeto from "../components/FormularioProjeto.vue";
import ListaProjeto from "../components/ListaProjetos.vue";

const rotas: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Tarefas",
    component: Tarefas,
  },
  {
    path: "/projetos",
    component: Projetos,
    children: [
      {
        path: "",
        name: "Projetos",
        component: ListaProjeto,
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
      },
    ],
  },
];

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

export default roteador;
