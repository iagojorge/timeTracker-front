<template>
    <section>
        <strong>{{ tempoCorrido }}</strong>
    </section>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Cronometro',
    /*Propriedades que vamos receber nesse componente*/
    props: {
        tempoSegundos: {
            type: Number,
            default: 0
        }
    },
    /*Monitora uma informação e quando é alterada é chamado*/
    computed: {
        tempoCorrido() : string {
            return new Date(this.tempoSegundos * 1000).toISOString().substr(11, 8)
        }
    },
})



</script>