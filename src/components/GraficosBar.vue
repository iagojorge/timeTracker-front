<template>
  <div class="chart-container">
    <canvas id="myChartBar" width="100%" height="100%"></canvas>
  </div>
</template>

<script lang="ts">
import { ChartData } from "chart.js";
import Chart, { ChartConfiguration } from "chart.js/auto";
import { defineComponent, PropType } from "vue";
import IResponse from "@/interfaces/IResponse";

export default defineComponent({
  name: "GraficosBar",
  methods: {},
  props: {
    semanaTempo: {
      type: Array as PropType<IResponse[]>,
      default: 0,
    },
  },
  mounted() {
    let labelsRota: string[] = [];
    let dataRota: number[] = [];

    for (let i = 6; i >= 0; i--) {
      labelsRota.push(this.semanaTempo[i].nome);
      dataRota.push(this.semanaTempo[i].tempo);
    }

    const data: ChartData = {
      labels: labelsRota,
      datasets: [
        {
          data: dataRota,
          backgroundColor: ["rgba(108, 191, 92)"],
          borderColor: ["rgb(0, 0, 0)"],
          borderWidth: 1,
        },
      ],
    };
    const config: ChartConfiguration = {
      type: "bar",
      data: data,
      options: {
        scales: {
          y: {
            display: false,
            suggestedMin: 1,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (TooltipItem) {
                const formattedValue = parseFloat(TooltipItem.formattedValue);

                return (
                  " Tempo gasto: " +
                  new Date(formattedValue * 1000).toISOString().substr(11, 8)
                );
              },
            },
          },
          title: {
            display: true,
            text: "Tempo gasto nos ultimos 7 dias",
            font: {
              size: 16,
            },
          },
          legend: {
            display: false,
          },
        },
        responsive: true, // Tornar o gráfico responsivo
        maintainAspectRatio: false, // Não manter uma proporção de aspecto fixa
      },
    };
    const ctx = <HTMLCanvasElement>document.getElementById("myChartBar");
    const myChart = new Chart(ctx, config);
    myChart;
  },
});
</script>
<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 500px; 
}
</style>
