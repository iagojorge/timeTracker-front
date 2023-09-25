<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Nova Tarefa">
                <input 
                    type="text" 
                    class="input" 
                    placeholder="Nome da tarefa"
                    v-model="descricaoTarefa">
            </div>
            <div class="column is-3">
                <div class="select">
                  <select v-model="idProjeto">
                    <option value="">Selecione o projeto</option>
                    <option
                      :value="projeto.id"
                      v-for="projeto in projetos"
                      :key="projeto.id">
                      {{ projeto.nome }}
                    </option>
                  </select>
                </div>
              </div>
            <div class="column">
                <Temporizador @temporizadorFim="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    /* eslint-disable */
    import { computed, defineComponent } from 'vue';
    import Temporizador from './Temporizador.vue';
    import { useStore } from 'vuex'

    import { key } from '../store'

    export default defineComponent ({
        name: 'FormularioTempo',
        emits: ['emitSalvarTarefa'],
        components: {
            Temporizador
        },
        data () {
           return{
            descricaoTarefa: '',
            idProjeto : ''
           } 
        },
        methods: {
            finalizarTarefa (tempoDecorrido: number): void{
                this.$emit('emitSalvarTarefa', {
                    tempoTarefa: tempoDecorrido,
                    descricao: this.descricaoTarefa,
                    projeto: this.projetos.find(proj => proj.id == this.idProjeto)
                })
                this.descricaoTarefa = '';
            }
        },
        setup () {
            const store = useStore(key)
            return {
                projetos: computed(() => store.state.projetos)
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