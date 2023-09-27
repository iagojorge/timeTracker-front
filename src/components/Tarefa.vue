<template>
   <Box>
    <div class="columns clicavel" @click="tarefaClicada">
        <div class="column is-4">
            {{ tarefa.descricao || 'Tarefa não definida'}}
        </div>
        <div class="column is-3">
            {{ tarefa.projeto?.nome || 'N/D'}}
        </div>
        <div class="column is- 5">
            <Cronometro :tempoSegundos="tarefa.tempoTarefa"/>
        </div>
    </div>
   </Box>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import ITarefa from '@/interfaces/ITarefa';
import Box from './Box.vue';

export default defineComponent({
    name: 'Tarefa',
    emits: ['aoTarefaClicada'],
    components:{
        Cronometro,
        Box
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    methods: {
        tarefaClicada (): void {
            this.$emit('aoTarefaClicada', this.tarefa)
        }
    }
})

</script>

<style scoped>
.clicavel{
    cursor: pointer;
}
</style>