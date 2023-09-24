
<template>
  <main class="columns is-gapless is-multiline" :class="{'modo-escuro': modoEscuroAtivo}">
   <div class="column is-one-quarter">
    <MenuLateral @temaAlterado="trocarTema"/>
   </div>
   <div class="column is-three-quarter conteudo">
    <FormularioTempo @emitSalvarTarefa="salvarTarefa"/>
    <div class="lista">
      <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
      <box v-if="tarefas.length == 0">
        Nenhuma tarefa encontrada
      </box>
    </div>
   </div>
  </main>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent } from 'vue';
import MenuLateral from './components/MenuLateral.vue'
import FormularioTempo from './components/FormularioTempo.vue';
import Tarefa from './components/Tarefa.vue';
import ITarefa from './interfaces/ITarefa';
import Box from './components/Box.vue';

export default defineComponent({
  name: 'App',
  components: {
   MenuLateral,
   FormularioTempo,
   Tarefa,
   Box
  },
  data () {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false,
    }
  },
  methods: {
    salvarTarefa (tarefa : ITarefa) {
      this.tarefas.push(tarefa);
    },
    trocarTema(modoEscuro: boolean) {
      this.modoEscuroAtivo = modoEscuro;
    }
  }
});
</script>

<style>
  .lista{
    padding: 1.25rem;
  }

  main{
    --bg-primario: #fff;
    --texto-primario:#CD7E75;
  }

  main.modo-escuro{
    --bg-primario: #2b2d42;
    --texto-primario: #CD7E75;
  }

  .conteudo{
    background-color: var(--bg-primario);
  }
</style>
