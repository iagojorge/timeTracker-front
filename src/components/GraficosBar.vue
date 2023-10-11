<template>
    <div>
      <canvas id="myChartBar" width="100%" height="100%"></canvas>
    </div>
  </template>
  
  <script lang="ts">
  import { ChartData } from "chart.js";
  import Chart, { ChartConfiguration } from "chart.js/auto";
  import { defineComponent, PropType } from "vue";
  import ISemana from "@/interfaces/ISemana";
  

  
  export default defineComponent({
    name: "GraficosBar",
    methods: {},
    props: {
    semanaTempo: {
      type: Array as PropType<ISemana[]>,
      default: 0,
      },
    },
    mounted() {
      let labelsRota: string[] = []
      let dataRota: number[] = []

      for (let i = 0; i < this.semanaTempo.length; i++) {
        labelsRota.push(this.semanaTempo[i].nome)
        dataRota.push(this.semanaTempo[i].tempoHoje)
      }
      const data: ChartData = {
      labels: labelsRota,
      datasets: [
        {
          label: "Ultimos 7 dias",
          data: dataRota,
          backgroundColor: [
            "rgba(108, 191, 92)",
          ],
          borderColor: [
            "rgb(0, 0, 0)",
          ],
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
            display: false
          }
        },
        responsive: true, // Tornar o gráfico responsivo
        maintainAspectRatio: false // Não manter uma proporção de aspecto fixa
      }
    };
      const ctx = <HTMLCanvasElement>document.getElementById("myChartBar");
      const myChart = new Chart(ctx, config);
      myChart;
    },
  });
  </script>
  <style></style>