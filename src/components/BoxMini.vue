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
    border-radius: 7%;
    margin-left: 4%; 
    margin-right: 3%;
    margin-top: 2.5vw;
    padding: 5%; 
    background: var(--bg-secundario);
}

@media (max-width: 768px) {
    .box {
        width: 90%; 
        padding: 10px;
    }
}

@media (min-width: 769px) and (max-width: 1200px) {
    .box {
        width: 80%; 
    }
}

@media (min-width: 1201px) {
    .box {
        width: 87%; 
    }
}
  </style>
  