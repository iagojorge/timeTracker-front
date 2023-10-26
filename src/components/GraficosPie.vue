<template>
  <div class="chart-container">
    <canvas id="myChartPie" width="100%" height="100%"></canvas>
  </div>
</template>

<script lang="ts">
import { ChartData } from "chart.js";
import Chart, { ChartConfiguration } from "chart.js/auto";
import { defineComponent, PropType } from "vue";
import IProjeto from "@/interfaces/IProjeto";

export default defineComponent({
  name: "GraficosPie",
  props: {
    projetoTempo: {
      type: Array as PropType<IProjeto[]>,
      default: 0,
    },
  },
  methods: {},
  mounted() {
    let labelsRota: string[] = [];
    let dataRota: number[] = [];

    for (let i = 0; i < this.projetoTempo.length; i++) {
      labelsRota.push(this.projetoTempo[i].name);
      dataRota.push(this.projetoTempo[i].timeTotalProject);
    }

    const data: ChartData = {
      labels: labelsRota,
      datasets: [
        {
          label: "Horas trabalhadas",
          data: dataRota,
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(255, 159, 64, 0.7)",
            "rgba(255, 205, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
          ],
          borderWidth: 1,
        },
      ],
    };
    const config: ChartConfiguration = {
      type: "doughnut",
      data: data,
      options: {
        plugins: {
          legend: {
            display: false,
          },
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
            text: "Tempo gasto total",
            font: {
              size: 16,
            },
          },
        },
        scales: {
          y: {
            display: false,
          },
        },
        responsive: true, // Tornar o gráfico responsivo
        maintainAspectRatio: true, // Não manter uma proporção de aspecto fixa
      },
    };

    const ctx = <HTMLCanvasElement>document.getElementById("myChartPie");
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
#myChartPie {
  position: sticky;
}
</style>
