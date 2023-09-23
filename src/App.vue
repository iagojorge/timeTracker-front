
<template>
  <main class="columns is-gapless is-multiline">
   <div class="column is-one-quarter">
    <MenuLateral/>
   </div>
   <div class="column is-three-quarter">
    <FormularioTempo/>
   </div>
  </main>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent } from 'vue';
import MenuLateral from './components/MenuLateral.vue'
import FormularioTempo from './components/FormularioTempo.vue';

export default defineComponent({
  name: 'App',
  components: {
   MenuLateral,
   FormularioTempo
  }
});
</script>

<style>

</style>
