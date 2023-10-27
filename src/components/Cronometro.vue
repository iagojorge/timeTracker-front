<template>
  <section>
    <div class="center">
      <slot name="tempoDia"></slot>
      <h1 class="relogio">{{ tempoCorrido }}</h1>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Cronometro",
  props: {
    tempoSegundos: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    tempoCorrido(): string {
      return new Date(this.tempoSegundos * 1000).toISOString().substr(11, 8);
    },
  },
});
</script>

<style scoped>
.center {
  text-align: center;
  box-sizing: border-box;
}

.relogio {
  font-family: "relogio-fonte", sans-serif;
  color: var(--texto-primario);
  font-size: 4vw;
  box-sizing: border-box;
  text-align: center;
}

@media only screen and (max-width: 900px) {
  .relogio {
    font-size: 7vw;
  }
}

@media only screen and (max-width: 768px) {
  .relogio {
    font-size: 10vw;
  }
}
</style>
