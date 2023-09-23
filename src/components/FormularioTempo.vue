<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Nova Tarefa">
                <input 
                    type="text" 
                    class="input" 
                    placeholder="Nome da tarefa">
            </div>
            <div class="column">
                <div class="is-flex is-aligh-items-center is-justify-content-space-between">
                    <section>
                        <strong>{{ tempoCorrido }}</strong>
                    </section>
                    <button class="button" @click="iniciar">
                        <span class="icon">
                            <i class="fas fa-play"></i>
                        </span>
                        <span>Play</span>
                    </button>
                    <button class="button" @click="finalizar">
                        <span class="icon">
                            <i class="fas fa-stop"></i>
                        </span>
                        <span>Stop</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent ({
        name: 'FormularioTempo',
        /*Define o estado inicial do componente*/
        data () {
            return {
                tempoSegundos: 0,
                cronometro: 0
            }
        },
        /*Monitora uma informação e quando é alterada é chamado*/
        computed: {
            tempoCorrido() : string {
                return new Date(this.tempoSegundos * 1000).toISOString().substr(11, 8)
            }
        },
        /*Funções de execução do usuario*/
        methods: {
            iniciar(){
              this.cronometro =  setInterval(() => {
                this.tempoSegundos += 1;
               }, 1000)
            },
            finalizar(){
                clearInterval(this.cronometro)
            }
        }
    })

</script>
