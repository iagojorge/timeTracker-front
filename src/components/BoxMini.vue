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
    width: 415px;
    height: 203px;
    flex-shrink: 1;
    border-radius: 30px;
    margin-right: 30px;
    margin-left: 30px;
    margin-top: 30px;
    padding: 50px;
    background: var( --bg-secundario);

  }
  </style>
  