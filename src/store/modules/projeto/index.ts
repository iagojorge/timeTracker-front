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

      // Verifique se o userId não é nulo antes de fazer a solicitação
      if (userId) {
        const config = {
          params: { userId: userId } // Passa o userId como parâmetro de consulta
        };
        return http.get("/projetos/list", config).then((response) => {
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
        return http.get("/dashboard/list", config).then((response) => {return response.data});
      }else{
        return 
      }
    },
    [CADASTRAR_PROJETOS](contexto, nomeProjeto: string) {
      return http.post("/projetos", {
        nome: nomeProjeto,
      });
    },
    [ALTERAR_PROJETOS](contexto, projeto: IProjeto) {
      return http.put(`/projetos/${projeto._id}`, projeto).then(() => this.dispatch(OBTER_PROJETOS));
    },
    [DELETAR_PROJETOS](contexto, id: string) {
      return http.delete(`/projetos/${id}`).then(() => this.dispatch(OBTER_PROJETOS));
    },
  },
};
