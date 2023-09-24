<template>
   <Box>
    <div class="columns">
        <div class="column is-7">
            {{ tarefa.descricao || 'Tarefa não definida'}}
        </div>
        <div class="column is- 5">
            <Cronometro :tempoSegundos="tarefa.tempoTarefa"/>
        </div>
    </div>
   </Box>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import ITarefa from '@/interfaces/ITarefa';
import Box from './Box.vue';

export default defineComponent({
    name: 'Tarefa',
    components:{
        Cronometro,
        Box
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    }
})

</script>

<style scoped>
.tempoTask{
    color: #000;
}
</style>