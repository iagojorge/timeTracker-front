
<template>
      <FormularioTempo @emitSalvarTarefa="salvarTarefa"/>
      <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa"/>
        <box v-if="tarefas?.length == 0">
          Nenhuma tarefa encontrada
        </box>
        <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Editar</p>
              <button class="delete" aria-label="close" @click="close"></button>
            </header>
            <section class="modal-card-body">
              <div class="field">
                <label for="descricaoTarefa" class="label">Descrição</label>
                <input
                    type="text"
                    class="input"
                    v-model="tarefaSelecionada.descricao"
                    id="nomeProjeto"
                />
            </div>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success" @click="editarTarefa">Salvar</button>
              <button class="button" @click="close">Cancelar</button>
            </footer>
          </div>
        </div>
      </div>
  </template>
  
  <script lang="ts">
  
  import { computed, defineComponent } from 'vue';
  import FormularioTempo from '../components/FormularioTempo.vue';
  import Tarefa from '../components/Tarefa.vue';
  import Box from '../components/Box.vue';
  import  { useStore }  from '@/store';
  import ITarefa from '@/interfaces/ITarefa';
  import useNotificador from '@/hooks/notificador';
  import { TipoNotificacao } from '@/interfaces/INotificacao';
  import { OBTER_TAREFAS, CADASTRAR_TAREFAS, OBTER_PROJETOS, ALTERAR_TAREFAS } from '@/store/tipo.acoes';
  
  export default defineComponent({
    name: 'App',
    components: {
     FormularioTempo,
     Tarefa,
     Box
    },
    data(){
      return {
        tarefaSelecionada: null as ITarefa | null
      }
    },
    methods: {
     salvarTarefa (tarefa : ITarefa) {
        this.store.dispatch(CADASTRAR_TAREFAS, tarefa)
     },
     selecionarTarefa (tarefa: ITarefa){
      this.tarefaSelecionada = tarefa
     },
     close (){
      this.tarefaSelecionada = null
     },
     editarTarefa (){
      this.store.dispatch(ALTERAR_TAREFAS, this.tarefaSelecionada)
        .then(() => {
          this.notificar(TipoNotificacao.SUCESSO, 'Tarefa', 'Tarefa alterada com sucesso!')
          this.close()
        }).catch(() => {this.notificar(TipoNotificacao.ERRO, 'Tarefa', 'Erro ao alterar a tarefa')})
     }
    },
    setup () {
        const { notificar } = useNotificador();
        const store = useStore()
        store.dispatch(OBTER_TAREFAS)
        store.dispatch(OBTER_PROJETOS)
        return {
            tarefas: computed(() => store.state.tarefa.tarefas),
            store,
            notificar
        }
    }
  });
  </script>
  

  