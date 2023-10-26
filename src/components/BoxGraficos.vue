<template>
  <div class="box has-text-weight-build">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BoxGraficos",
});
</script>

<style scoped>
.box {
  border-radius: 30px;
  width: 95%;
  height: 100%;
  margin-left: 2%;
  margin-right: 2%;
  margin-top: 20px;
  padding: 5%;
  background: var(--bg-secundario);
}

@media (max-width: 768px) {
  .box {
    width: 90%;
    padding: 10px;
  }
}
</style>
