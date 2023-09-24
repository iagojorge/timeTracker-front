
<template>
      <FormularioTempo @emitSalvarTarefa="salvarTarefa"/>
      <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        <box v-if="tarefas.length == 0">
          Nenhuma tarefa encontrada
        </box>
      </div>
  </template>
  
  <script lang="ts">
  /* eslint-disable */
  
  import { defineComponent } from 'vue';
  import FormularioTempo from '../components/FormularioTempo.vue';
  import Tarefa from '../components/Tarefa.vue';
  import ITarefa from '../interfaces/ITarefa';
  import Box from '../components/Box.vue';
  
  export default defineComponent({
    name: 'App',
    components: {
     FormularioTempo,
     Tarefa,
     Box
    },
    data () {
      return {
        tarefas: [] as ITarefa[],
      }
    },
    methods: {
      salvarTarefa (tarefa : ITarefa) {
        this.tarefas.push(tarefa);
      }
    }
  });
  </script>
  

  