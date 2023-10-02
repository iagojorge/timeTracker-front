<template>
    <div class="columns is-gapless is-multiline">
        <div class="column is-7">
            <BoxGraficos>
                <GraficosBar/>
            </BoxGraficos>
        </div>
        <div class="column is-5">
            <BoxPie>
                <GraficosPie></GraficosPie>
            </BoxPie>
        </div>
        <div class="column is-3">
            <BoxMini></BoxMini>
        </div>
        <div class="column is-3">
            <BoxMini></BoxMini>
        </div>
        <div class="column is-3">
            <BoxMini></BoxMini>
        </div>
        <div class="column is-3">
            <BoxMini></BoxMini>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { OBTER_PROJETOS } from '@/store/tipo.acoes';
import { useStore } from "@/store";
import BoxGraficos from "@/components/BoxGraficos.vue";
import GraficosBar from '@/components/GraficosBar.vue';
import BoxPie from '@/components/BoxPie.vue';
import GraficosPie from '@/components/GraficosPie.vue';
import BoxMini from '@/components/BoxMini.vue'

export default defineComponent({
    name: 'Dashboard',
    setup() {
        const store = useStore();
        store.dispatch(OBTER_PROJETOS);
    },
    components: { GraficosBar, BoxGraficos, BoxPie, GraficosPie, BoxMini }
})
</script>


<style scoped>

</style>