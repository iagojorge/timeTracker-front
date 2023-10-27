<template>
  <div class="box has-text-weight-build">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BoxMini",
});
</script>

<style scoped>
.box {
  width: 90%;
  border-radius: 7%;
  margin-left: 4%;
  margin-right: 3%;
  margin-top: 2.5vw;
  padding: 5%;
  background: var(--bg-secundario);
}

@media (max-width: 900px) {
  .box {
    width: 95%;
    border-radius: 7%;
    margin-left: 2%;
    margin-right: 3%;
    margin-top: 5vw;
    padding: 5%;
  }
}
</style>
