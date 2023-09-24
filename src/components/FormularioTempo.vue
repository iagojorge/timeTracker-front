<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Nova Tarefa">
                <input 
                    type="text" 
                    class="input" 
                    placeholder="Nome da tarefa"
                    v-model="descricaoTarefa">
            </div>
            <div class="column">
                <Temporizador @temporizadorFim="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    /* eslint-disable */
    import { defineComponent } from 'vue';
    import Temporizador from './Temporizador.vue';

    export default defineComponent ({
        name: 'FormularioTempo',
        emits: ['emitSalvarTarefa'],
        components: {
            Temporizador
        },
        data () {
           return{
            descricaoTarefa: ''
           } 
        },
        methods: {
            finalizarTarefa (tempoDecorrido: number): void{
                this.$emit('emitSalvarTarefa', {
                    tempoTarefa: tempoDecorrido,
                    descricao: this.descricaoTarefa
                })
                this.descricaoTarefa = '';
            }
        }
       
    })

</script>

<style>
.formulario{
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>