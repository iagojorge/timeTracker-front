<template>
  <main>
    <div>
      <RouterView></RouterView>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

console.log(localStorage.getItem("token"));

export default defineComponent({
  name: "App",
});
</script>

<style>

</style>
