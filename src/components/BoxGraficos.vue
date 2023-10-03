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
    width: 1030px;
    height: 550px;
    flex-shrink: 1;
    margin-left: 30px;
    margin-top: 20px;
    padding: 40px;
    background: var( --bg-secundario);
  }
  </style>
  