<template>
  <div class="columns is-gapless is-multiline dashboard">
    <div class="column is-7">
      <BoxGraficos>
        <GraficosBar />
      </BoxGraficos>
    </div>
    <div class="column is-5">
      <BoxPie>
        <GraficosPie v-if="projetosProntos" :projetos="projetos" />
      </BoxPie>
    </div>
    <div class="column is-3">
      <BoxMini>
        <h1 class="texto-desc">TOTAL</h1>
        <h1 class="tempo">{{ tempoTotal }}</h1>
      </BoxMini>
    </div>
    <div class="column is-3">
      <BoxMini>
        <h1 class="texto-desc">ULTIMO MÊS</h1>
        <h1 class="tempo">{{ tempoMes }}</h1>
      </BoxMini>
    </div>
    <div class="column is-3">
      <BoxMini>
        <h1 class="texto-desc">ULTIMA SEMANA</h1>
        <h1 class="tempo">{{ tempoSemana }}</h1>
      </BoxMini>
    </div>
    <div class="column is-3">
      <BoxMini>
        <h1 class="texto-desc">HOJE</h1>
        <h1 class="tempo">{{ tempoDia }}</h1>
      </BoxMini>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { OBTER_PROJETOS } from "@/store/tipo.acoes";
import { useStore } from "@/store";
import IProjeto from "@/interfaces/IProjeto";
import BoxGraficos from "@/components/BoxGraficos.vue";
import GraficosBar from "@/components/GraficosBar.vue";
import BoxPie from "@/components/BoxPie.vue";
import GraficosPie from "@/components/GraficosPie.vue";
import BoxMini from "@/components/BoxMini.vue";

export default defineComponent({
  name: "Dashboard",
  setup() {
    const store = useStore();
    const projetos = ref<IProjeto[]>([]);
    const projetosProntos = ref(false);

    const obterProjetos = async () => {
      try {
        const response = await store.dispatch(OBTER_PROJETOS);
        projetos.value = response;
        projetosProntos.value = true;
      } catch (erro) {
        console.error(erro);
      }
    };

    onMounted(() => {
      obterProjetos();
    });


    let tempoTotal: number = 3362;
    let tempoDia: number = 36;
    let tempoSemana: number = 1920;
    let tempoMes: number = 3362;

    return {
      projetos,
      projetosProntos,
      tempoDia: new Date(tempoDia * 1000).toISOString().substr(11, 8),
      tempoTotal: new Date(tempoTotal * 1000).toISOString().substr(11, 8),
      tempoSemana: new Date(tempoSemana * 1000).toISOString().substr(11, 8),
      tempoMes: new Date(tempoMes * 1000).toISOString().substr(11, 8),
    };

    // for (let i: number = 0; i < projetos.value.length; i++) {
    //    tempoDia += projetos.value[i].tempoDia
    //    tempoTotal += projetos.value[i].tempoTotal
    //  }
  },
  components: { GraficosBar, BoxGraficos, BoxPie, GraficosPie, BoxMini },
});
</script>

<style scoped>

.dashboard{
  height: 92vh;
}
.texto-desc {
  color: var(--texto-primario);
  text-align: center;
  font-family: Inter;
  font-size: 1vw;
  font-style: normal;
  line-height: 20px;
}

.tempo {
  font-family: "relogio-fonte", sans-serif;
  color: var(--texto-primario);
  font-size: 4vw;
  text-align: center;
}
</style>
