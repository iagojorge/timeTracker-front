<template>
  <div class="box has-text-weight-build">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Box",
});
</script>

<style scoped>
.box {
  margin-top: 20px;
  padding: 50px;
  background: var(--bg-secundario);
  box-sizing: border-box;
}
</style>
