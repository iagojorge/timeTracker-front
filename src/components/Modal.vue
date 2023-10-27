<template>
  <div class="modal" :class="{ 'is-active': mostrar }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <slot name="cabecalho"></slot>
      </header>
      <section class="modal-card-body">
        <slot name="corpo"></slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    mostrar: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style scoped>
.modal-card-head {
  background-color: var(--bg-primario);
  border: none;
}

.modal-card-body {
  background-color: var(--bg-menu);
  border: none;
}

.modal-card-foot {
  background-color: var(--bg-menu);
  border: none;
}
</style>
