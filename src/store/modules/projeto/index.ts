import IProjeto from "@/interfaces/IProjeto";
import http from "@/http";
import { DEFINIR_PROJETO } from "@/store/tipo-mutacoes";
import {
  OBTER_PROJETOS,
  CADASTRAR_PROJETOS,
  ALTERAR_PROJETOS,
  DELETAR_PROJETOS,
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
      let url = "projetos";

      if (filtro) {
        url += "?nome=" + filtro;
      }

      http.get(url).then((response) => {
        commit(DEFINIR_PROJETO, response.data)
      });
    },
    [CADASTRAR_PROJETOS](contexto, nomeProjeto: string) {
      return http.post("/projetos", {
        nome: nomeProjeto,
      });
    },
    [ALTERAR_PROJETOS](contexto, projeto: IProjeto) {
      return http.put(`/projetos/${projeto.id}`, projeto).then(() => this.dispatch(OBTER_PROJETOS));
    },
    [DELETAR_PROJETOS](contexto, id: string) {
      return http.delete(`/projetos/${id}`).then(() => this.dispatch(OBTER_PROJETOS));
    },
  },
};
