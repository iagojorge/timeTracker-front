<template>
    <div class="is-flex is-aligh-items-center is-justify-content-space-between">                  
        <cronometro :tempoSegundos="tempoSegundos"/>
         <button class="button" @click="iniciar" :disabled="cronometroRodando">
             <span class="icon">
                 <i class="fas fa-play"></i>
             </span>
             <span>Play</span>
         </button>
         <button class="button" @click="finalizar" :disabled="!cronometroRodando">
             <span class="icon">
                 <i class="fas fa-stop"></i>
             </span>
             <span>Stop</span>
         </button>
     </div>
</template>

<script lang="ts">
    /* eslint-disable */
    import { defineComponent } from 'vue';

    import Cronometro from './Cronometro.vue';

    export default defineComponent({
        name: 'Temporizador',
        components: {
            Cronometro
        },
        /*Lista de ações que o componente pode emitir*/
        emits: ['temporizadorFim'],
        /*Define o estado inicial do componente*/
        data () {
            return {
                tempoSegundos: 0,
                cronometro: 0,
                cronometroRodando: false
            }
        },
        /*Funções de execução do usuario*/
        methods: {
            iniciar(){
              this.cronometroRodando = true;
              this.cronometro =  setInterval(() => {
                this.tempoSegundos += 1;
               }, 1000);
            },
            finalizar(){
                this.cronometroRodando = false;
                clearInterval(this.cronometro);
                this.$emit("temporizadorFim", this.tempoSegundos)
                this.tempoSegundos = 0
            }
        }
    })
</script>