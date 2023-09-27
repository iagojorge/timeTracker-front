<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Nova Tarefa">
                <input 
                    type="text" 
                    class="input" 
                    placeholder="Nome da tarefa"
                    v-model="descricaoTarefa">
            </div>
            <div class="column is-3">
                <div class="select">
                  <select v-model="idProjeto">
                    <option value="">Selecione o projeto</option>
                    <option
                      :value="projeto.id"
                      v-for="projeto in projetos"
                      :key="projeto.id">
                      {{ projeto.nome }}
                    </option>
                  </select>
                </div>
              </div>
            <div class="column">
                <Temporizador @temporizadorFim="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent, ref } from 'vue';
    import { useStore } from 'vuex';
    import { TipoNotificacao } from '@/interfaces/INotificacao';
    import Temporizador from './Temporizador.vue';
    import { key } from '@/store'
    import useNotificador from '@/hooks/notificador'
    
    export default defineComponent ({
        name: 'FormularioTempo',
        emits: ['emitSalvarTarefa'],
        components: {
            Temporizador
        },
        setup (props, {emit}) {
            const store = useStore(key);
            const { notificar } = useNotificador();
            const projetos= computed(() => store.state.projeto.projetos);
            const descricaoTarefa = ref("");
            const idProjeto = ref("");

            const finalizarTarefa = function (tempoDecorrido: number): void {
                const projeto = projetos.value.find((p) => p.id == idProjeto.value)
                if(!projeto){
                    notificar(TipoNotificacao.ATENCAO, 'Projeto', 'Selecione um projeto antes de finalizar a tarefa!')
                }else{
                    emit('emitSalvarTarefa', {
                        tempoTarefa: tempoDecorrido,
                        descricao: descricaoTarefa.value,
                        projeto: projetos.value.find(proj => proj.id == idProjeto.value)
                    })
                    descricaoTarefa.value = '';
                }
            }


            return {
                descricaoTarefa,
                idProjeto,
                projetos,
                finalizarTarefa
            }
        }
        
    })
    
</script>

<style>
.formulario{
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>