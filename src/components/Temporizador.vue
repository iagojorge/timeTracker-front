<template>
  <div class="-aligh-items-center">
    <cronometro :tempoSegundos="tempoSegundos" />
  </div>
  <div class="button-container">
    <a class="circle-button red" v-if="!cronometroRodando" @click="iniciar" :class="{ 'icon-disabled': !projetoSelecionado }">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
    </a>
    <a  class="circle-button red" v-if="cronometroRodando" @click="pause" >
      <span class="icon">
        <i class="fas fa-pause"></i>
      </span>
    </a>
    <a  class="circle-button" @click="finalizar" :class="{ 'icon-disabled': !tempoSegundos || !projetoSelecionado }">
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
  props: {
    projetoSelecionado: String
  },
  emits: ["temporizadorFim"],
  data() {
    return {
      tempoSegundos: 0,
      cronometro: 0,
      cronometroRodando: false,
    };
  },
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
    width: 3.5vw;
    height: 3.5vw;
    background-color: #4c4c4c; 
    border-radius: 50%; 
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #fff; 
    font-size: 1.5vw; 
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
