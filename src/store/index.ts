
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { NOTIFICAR } from "./tipo-mutacoes";
import { LOGIN, CADASTRO } from "./tipo.acoes";
import http from "@/http";
import IUser from "@/interfaces/IUser"
import { INotificacao } from "@/interfaces/INotificacao";
import { EstadoProjeto, projeto } from "./modules/projeto";


export interface Estado {
  notificacoes: INotificacao[];
  projeto: EstadoProjeto;

}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    notificacoes: [],
    projeto: {
      projetos: [],
    },
  },
  mutations: {
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notificacao) => notificacao.id != novaNotificacao.id
        );
      }, 3000);
    },
  },
  actions: {
    [LOGIN](state, user: IUser){
      return http.post("/api/user/login", user)
    },
    [CADASTRO](state, user: IUser){
      return http.post("/api/user/register", user)
    }
  },
  modules: {
    projeto
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
