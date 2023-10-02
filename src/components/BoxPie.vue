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
    width: 750px;
    height: 550px;
    margin-right: 30px;
    flex-shrink: 1;
    margin-top: 20px;
    padding: 50px;
    background: #2D2D2D;
  }
  </style>
  