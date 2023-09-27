import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { Module } from "vuex";
import { OBTER_TAREFAS, CADASTRAR_TAREFAS, ALTERAR_TAREFAS } from "@/store/tipo.acoes";
import { DEFINIR_TAREFAS, ADCIONA_TAREFA, EDITAR_TAREFA } from "@/store/tipo-mutacoes";
import http from '@/http'

export interface EstadoTarefa{
    tarefas: ITarefa[]
}

export const tarefa:Module<EstadoTarefa, Estado> = {
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]){
            state.tarefas = tarefas
        },
        [ADCIONA_TAREFA](state, tarefa: ITarefa){
            state.tarefas.push(tarefa)
        },
        [EDITAR_TAREFA](state, tarefa: ITarefa){
            const index = state.tarefas.findIndex(taref => taref.id === tarefa.id)
            state.tarefas[index] = tarefa
        }
    },
    actions: {
        [OBTER_TAREFAS]( {commit} ){
            http.get('tarefas')
                .then(response => commit(DEFINIR_TAREFAS, response.data ))
        },
        [CADASTRAR_TAREFAS](contexto, tarefa:ITarefa){
            return http.post('/tarefas', tarefa)
                .then( (response) => this.commit(ADCIONA_TAREFA, response.data))
        }, 
        [ALTERAR_TAREFAS]( {commit} , tarefa: ITarefa){
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(response => commit(EDITAR_TAREFA, response.data))

        }
    }
}