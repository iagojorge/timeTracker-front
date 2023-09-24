<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="">
        </h1>
        <button class="button" @click="alterarTema">
          {{ textoTema }}
        </button>
    </header>
</template>

<script lang="ts">
 import { defineComponent } from 'vue';

 export default defineComponent({
    name: 'MenuLateral',
    emits: ['temaAlterado'],
    data (){
      return {
        modoEscuro: false
      }
    },
    computed: {
      textoTema () {
        if (this.modoEscuro){
          return 'Desativar modo escuro'
        }else{
          return 'Ativar modo escuro'
        }
      }
    },
    methods:{
      alterarTema() {
        this.modoEscuro = !this.modoEscuro;
        this.$emit('temaAlterado', this.modoEscuro);
      }
    }
 })
</script>

<style scoped>
header {
    text-align: center;
    padding: 1rem;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
  }
  @media only screen and (max-width: 768px) {
    header {
      padding: 2.5rem;
      height: auto;
    }
  }
</style>