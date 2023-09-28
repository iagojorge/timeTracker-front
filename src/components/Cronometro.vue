<template>
  <section>
    <div class="center">
      <h1 class="relogio">{{ tempoCorrido }}</h1>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Cronometro",
  /*Propriedades que vamos receber nesse componente*/
  props: {
    tempoSegundos: {
      type: Number,
      default: 0,
    },
  },
  /*Monitora uma informação e quando é alterada é chamado*/
  computed: {
    tempoCorrido(): string {
      return new Date(this.tempoSegundos * 1000).toISOString().substr(11, 8);
    },
  },
});
</script>

<style scoped>
.display {
  color: var(--texto-primario);
}

.center {
  text-align: center;
}

.relogio {
  font-family: 'relogio-fonte', sans-serif;
  color: white;
  font-size: 70px;
  text-align: center;
}

@font-face {
  font-family: 'relogio-fonte';
  src: url('../assets/font/DS-DIGI.TTF') format('truetype');
  /* Adicione outros formatos da fonte, se necessário */
}
</style>
