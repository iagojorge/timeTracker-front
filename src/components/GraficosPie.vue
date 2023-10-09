<template>
    <div>
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
    projetos: {
      type: Array as PropType<IProjeto[]>,
      default: 0,
      },
    },
    methods: {},
    mounted() {
      let labelsRota: string[] = []
      let dataRota: number[] = []
      for (let i: number = 0; i < this.projetos.length; i++){
        labelsRota.push(this.projetos[i].nome)
        dataRota.push(10)
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