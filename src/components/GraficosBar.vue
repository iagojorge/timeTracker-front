<template>
    <div>
      <canvas id="myChartBar" width="100%" height="100%"></canvas>
    </div>
  </template>
  
  <script lang="ts">
  import { ChartData } from "chart.js";
  import Chart, { ChartConfiguration } from "chart.js/auto";
  import { defineComponent } from "vue";
  
  const data: ChartData = {
    labels: ["Domingo","Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
    datasets: [
      {
        label: "Horas trabalhadas",
        data: [1, 8, 4, 5, 6, 7, 1],
        backgroundColor: [
          "rgba(108, 191, 92)",
          "rgba(108, 191, 92)",
          "rgba(108, 191, 92)",
          "rgba(108, 191, 92)",
          "rgba(108, 191, 92)",
          "rgba(108, 191, 92)",
          "rgba(108, 191, 92)",
        ],
        borderColor: [
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
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
  
  export default defineComponent({
    name: "GraficosBar",
    methods: {},
    mounted() {
      const ctx = <HTMLCanvasElement>document.getElementById("myChartBar");
      const myChart = new Chart(ctx, config);
      myChart;
    },
  });
  </script>
  <style></style>