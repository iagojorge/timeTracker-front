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
            <BoxMini>
                <h1 class="texto-desc">TOTAL</h1>
                <h1 class="tempo">100 HORAS</h1>
            </BoxMini>
        </div>
        <div class="column is-3">
            <BoxMini>
                <h1 class="texto-desc">ULTIMO MÊS</h1>
                <h1 class="tempo">100 HORAS</h1>
            </BoxMini>
        </div>
        <div class="column is-3">
            <BoxMini>
                <h1 class="texto-desc">ULTIMA SEMANA</h1>
                <h1 class="tempo">100 HORAS</h1>
            </BoxMini>
        </div>
        <div class="column is-3">
            <BoxMini>
                <h1 class="texto-desc">HOJE</h1>
                <h1 class="tempo">100 HORAS</h1>
            </BoxMini>
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
.texto-desc{
    color: white;
    text-align: center;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    line-height: 20px;
  }

  
.tempo {
    font-family: 'relogio-fonte', sans-serif;
    color: white;
    font-size: 70px;
    text-align: center;
  }
</style>