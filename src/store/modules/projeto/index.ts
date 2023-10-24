import IProjeto from "@/interfaces/IProjeto";
import http from "@/http";
import { DEFINIR_PROJETO } from "@/store/tipo-mutacoes";
import {
  OBTER_PROJETOS,
  CADASTRAR_PROJETOS,
  ALTERAR_PROJETOS,
  DELETAR_PROJETOS,
  OBTER_DASHBOARD
} from "@/store/tipo.acoes";
import { Estado } from "@/store";
import { Module } from "vuex";

export interface EstadoProjeto {
  projetos: IProjeto[];
}

export const projeto: Module<EstadoProjeto, Estado> = {
  mutations: {
    [DEFINIR_PROJETO](state, projetos: IProjeto[]) {  
      state.projetos = projetos;
   
    },
  },
  actions: {
    [OBTER_PROJETOS]({ commit }, filtro: string) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const config = {
          params: { userId: userId, nameProject: filtro }
        };
        return http.get("/api/projects/summary/list", config).then((response) => {
          commit(DEFINIR_PROJETO, response.data);
          return response.data;
        });
      }else{
        return 
      }
    },
    [OBTER_DASHBOARD]({ commit }, filtro: string) {
      const userId = localStorage.getItem('userId');

      if (userId) {
        const config = {
          params: { userId: userId } 
        };
        return http.get("/api/projects/dashboard/list", config).then((response) => {return response.data});
      }else{
        return 
      }
    },
    [CADASTRAR_PROJETOS](contexto, nomeProjeto: string) {
      return http.post("/api/projects", { 
        name: nomeProjeto,
        userId: localStorage.getItem('userId')
      });
    },
    [ALTERAR_PROJETOS](contexto, projeto: IProjeto) {
      return http.put(`/api/projects/${projeto.id}`, projeto).then(() => this.dispatch(OBTER_PROJETOS));
    },
    [DELETAR_PROJETOS](contexto, id: string) {
      return http.delete(`/api/projects/${id}`).then(() => this.dispatch(OBTER_PROJETOS));
    },
  },
};
