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
      width: 750px;
      height: 550px;
      border-radius: 30px;
    margin-right: 30px;
    margin-top: 20px;
    flex-shrink: 1;
    padding: 50px;
    background: var( --bg-secundario);
  }
  </style>
  