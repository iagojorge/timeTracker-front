
<template>
  <main class="columns is-gapless is-multiline" :class="{'modo-escuro': modoEscuroAtivo}">
   <div class="column is-one-quarter">
    <MenuLateral @temaAlterado="trocarTema"/>
   </div>
   <div class="column is-three-quarter conteudo">
    <!-- Rota do view -->
    <RouterView></RouterView>
   </div>
  </main>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import MenuLateral from './components/MenuLateral.vue'

export default defineComponent({
  name: 'App',
  components: {
   MenuLateral,
  },
  data () {
    return {
      modoEscuroAtivo: false,
    }
  },
  methods: {
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
