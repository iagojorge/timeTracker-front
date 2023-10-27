<template>
  <div class="box has-text-weight-build">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BoxPie",
});
</script>

<style scoped>
.box {
  border-radius: 30px;
  width: 95%;
  height: 100%;
  margin-right: 2%;
  margin-top: 20px;
  padding: 5%;
  background: var(--bg-secundario);
}

@media (max-width: 900px) {
  .box {
    margin-top: 5%;
    width: 95%;
    margin-left: 2%;
    height: 100%;
    padding: 0;
  }
}

@media (max-width: 600px) {
  .box {
    padding: 10px;
  }
}
</style>
