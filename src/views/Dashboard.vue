<template>
  <div
    class="columns is-gapless is-multiline dashboard"
    v-if="projetosProntos && carregandoDados"
  >
    <div class="column is-7">
      <BoxGraficos>
        <GraficosBar :semanaTempo="semanaTempo" />
      </BoxGraficos>
    </div>
    <div class="column is-5">
      <BoxPie>
        <GraficosPie :projetoTempo="projetoTempo" />
      </BoxPie>
    </div>
    <div class="column is-4">
      <BoxMini class="margin">
        <h1 class="texto-desc">ULTIMO MÊS</h1>
        <h1 class="tempo">{{ tempoMes }}</h1>
      </BoxMini>
    </div>
    <div class="column is-4">
      <BoxMini>
        <h1 class="texto-desc">ULTIMA SEMANA</h1>
        <h1 class="tempo">{{ tempoSemana }}</h1>
      </BoxMini>
    </div>
    <div class="column is-4">
      <BoxMini class="margin-left">
        <h1 class="texto-desc">HOJE</h1>
        <h1 class="tempo">{{ tempoDia }}</h1>
      </BoxMini>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { OBTER_DASHBOARD, OBTER_PROJETOS } from "@/store/tipo.acoes";
import { useStore } from "@/store";
import BoxGraficos from "@/components/BoxGraficos.vue";
import GraficosBar from "@/components/GraficosBar.vue";
import BoxPie from "@/components/BoxPie.vue";
import GraficosPie from "@/components/GraficosPie.vue";
import BoxMini from "@/components/BoxMini.vue";

export default defineComponent({
  name: "Dashboard",
  setup() {
    const store = useStore();
    const semanaTempo = ref([]);
    const projetosProntos = ref(false);
    const tempoDia = ref(0);
    const tempoSemana = ref(0);
    const tempoMes = ref(0);
    const projetoTempo = ref([]);

    const carregandoDados = ref(false);

    const obterProjetos = async () => {
      try {
        const response = await store.dispatch(OBTER_PROJETOS);
        projetoTempo.value = response;
        projetosProntos.value = true;
      } catch (erro) {
        console.error(erro);
      }
    };

    const obterDashboard = async () => {
      try {
        const response = await store.dispatch(OBTER_DASHBOARD);
        tempoDia.value = response.timeToday;
        tempoMes.value = response.timeMonth;
        tempoSemana.value = response.timeLastWeek;
        semanaTempo.value = response.timeWeek;
        carregandoDados.value = true;
      } catch (erro) {}
    };

    onMounted(() => {
      obterProjetos();
      obterDashboard();
    });

    return {
      projetosProntos,
      projetoTempo,
      carregandoDados,
      tempoDia,
      tempoSemana,
      tempoMes,
      semanaTempo,
    };
  },
  components: { GraficosBar, BoxGraficos, BoxPie, GraficosPie, BoxMini },
});
</script>

<style scoped>
.dashboard {
  width: 100%;
  min-height: 92vh;
  height: 100%;
  box-sizing: border-box;
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

.margin{
  margin-top: 2.5vw;
}

.margin-left{
  padding-right: 20px;
}

@media only screen and (max-width: 768px) {
.tempo{
  font-size: 10vw;
}

.texto-desc{
  font-size: 4vw;
  margin-top: 10px;
}

}

@media screen and (max-width: 900px) {
  .columns.dashboard .column {
    width: 100% !important;
  }
  .tempo{
    font-size: 8vw;
  }
  
  .texto-desc{
    font-size: 3vw;
    margin-top: 10px;
  }
  
  .margin{
    margin-top: 6vw;
  }
}
</style>
