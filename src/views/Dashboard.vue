<template>
    <div class="columns is-gapless is-multiline">
        <div class="column is-7">
            <BoxGraficos>
                <GraficosBar/>
            </BoxGraficos>
        </div>
        <div class="column is-5">
            <BoxPie>
                <GraficosPie :projetos="projetos"/>
            </BoxPie>
        </div>
        <div class="column is-3">
            <BoxMini>
                <h1 class="texto-desc">TOTAL</h1>
                <h1 class="tempo">{{ tempoTotal }} </h1>
            </BoxMini>
        </div>
        <div class="column is-3">
            <BoxMini>
                <h1 class="texto-desc">ULTIMO MÊS</h1>
                <h1 class="tempo">N/D</h1>
            </BoxMini>
        </div>
        <div class="column is-3">
            <BoxMini>
                <h1 class="texto-desc">ULTIMA SEMANA</h1>
                <h1 class="tempo">N/D</h1>
            </BoxMini>
        </div>
        <div class="column is-3">
            <BoxMini>
                <h1 class="texto-desc">HOJE</h1>
                <h1 class="tempo">{{  tempoDia  }} </h1>
            </BoxMini>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
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
        console.log("teste")

        const store = useStore();
        store.dispatch(OBTER_PROJETOS);
        const projetos = computed(() => store.state.projeto.projetos);

        let tempoTotal: number = 10;
        let tempoDia: number = 10;

       // for (let i: number = 0; i < projetos.value.length; i++) {
       //    tempoDia += projetos.value[i].tempoDia 
       //    tempoTotal += projetos.value[i].tempoTotal
      //  }

        return{
            projetos,
            tempoDia: new Date(tempoDia * 1000).toISOString().substr(11, 8),
            tempoTotal: new Date(tempoTotal * 1000).toISOString().substr(11, 8)
        }
    },
    components: { GraficosBar, BoxGraficos, BoxPie, GraficosPie, BoxMini }
})
</script>


<style scoped>
.texto-desc{
    color: var(--texto-primario);
    text-align: center;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    line-height: 20px;
  }

  
.tempo {
    font-family: 'relogio-fonte', sans-serif;
    color: var(--texto-primario);
    font-size: 70px;
    text-align: center;
  }
</style>