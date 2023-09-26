import IProjeto from "@/interfaces/IProjeto";
import { createStore, Store, useStore as vuexUseStore} from "vuex";
import { InjectionKey } from 'vue';
import { NOTIFICAR, DEFINIR_PROJETO } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { CADASTRAS_PROJETOS, OBTER_PROJETOS, ALTERAR_PROJETOS, DELETAR_PROJETOS } from "./tipo.acoes";
import http from "@/http";



interface Estado {
    projetos: IProjeto[]
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: []
    },
    mutations: {
        [DEFINIR_PROJETO](state, projetos: IProjeto[]){
            state.projetos = projetos
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao){
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        }
    },
    actions: {
        [OBTER_PROJETOS] ( {commit} ){
            http.get('projetos')
                .then(response => commit(DEFINIR_PROJETO, response.data ))
        },
        [CADASTRAS_PROJETOS] ( contexto, nomeProjeto:string ){
            return http.post('/projetos', {
                nome: nomeProjeto
            })
        },
        [ALTERAR_PROJETOS] ( contexto, projeto:IProjeto ){
            return http.put(`/projetos/${projeto.id}`, projeto)
        },
        [DELETAR_PROJETOS] ( contexto, id:string ){
            return http.delete(`/projetos/${id}`)   
                .then(()=> { this.dispatch(OBTER_PROJETOS)})
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key);

}