<template>
    <div>
        <canvas id="myChartPie" width="100%" height="100%"></canvas>
      </div>
  </template>
  
  <script lang="ts">
  import { ChartData } from "chart.js";
  import Chart, { ChartConfiguration } from "chart.js/auto";
  import { defineComponent } from "vue";
  
  const data: ChartData = {
    labels: ["Estudando Vue3", "Desenvolvendo v3", "Jogando mage fire", "Clareira de comrumbaia"],
    datasets: [
      {
        label: "Horas trabalhadas",
        data: [25, 10, 20, 45],
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
            display:true,
            position: 'left'
        }
      }, 
      scales: {
        y: {
          display: false
        }
      },
      responsive: true, // Tornar o gráfico responsivo
      maintainAspectRatio: false // Não manter uma proporção de aspecto fixa
    }
  };
  
  export default defineComponent({
    name: "GraficosPie",
    methods: {},
    mounted() {
      const ctx = <HTMLCanvasElement>document.getElementById("myChartPie");
      const myChart = new Chart(ctx, config);
      myChart;
    },
  });
  </script>
  <style scoped>

  #myChartPie {
    position: relative;
    top: 40px;
    left: 0px;
}

</style>