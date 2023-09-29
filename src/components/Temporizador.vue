<template>
  <div class="-aligh-items-center">
    <cronometro :tempoSegundos="tempoSegundos" />
  </div>
  <div class="button-container">
    <a href="#" class="circle-button red" v-if="!cronometroRodando" @click="iniciar" >
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
    </a>
    <a href="#" class="circle-button red" v-if="cronometroRodando" @click="pause" >
      <span class="icon">
        <i class="fas fa-pause"></i>
      </span>
    </a>
    <a href="#" class="circle-button" @click="finalizar" :class="{ 'icon-disabled': !tempoSegundos }">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Cronometro from "./Cronometro.vue";

export default defineComponent({
  name: "Temporizador",
  components: {
    Cronometro,
  },
  /*Lista de ações que o componente pode emitir*/
  emits: ["temporizadorFim"],
  /*Define o estado inicial do componente*/
  data() {
    return {
      tempoSegundos: 0,
      cronometro: 0,
      cronometroRodando: false,
    };
  },
  /*Funções de execução do usuario*/
  methods: {
    iniciar() {
        this.cronometroRodando = true;

        this.cronometro = setInterval(() => {
            this.tempoSegundos += 1;
         }, 1000);
    },
    finalizar() {
      this.cronometroRodando = false;
      clearInterval(this.cronometro);
      this.$emit("temporizadorFim", this.tempoSegundos);
      this.tempoSegundos = 0;
    },
    pause(){
      this.cronometroRodando = false;
      clearInterval(this.cronometro);
    },
  },
});
</script>

<style scoped>
  .circle-button {
    width: 60px;
    height: 60px;
    background-color: #4c4c4c; 
    border-radius: 50%; 
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #fff; 
    font-size: 24px; 
  }

  .icon-disabled {
    opacity: 0.5; 
    pointer-events: none; 
  }

  .red{
    background-color: red;
  }

  .button-container {
    display: flex; 
    justify-content: center; 
    gap: 10px; 
  }
</style>
