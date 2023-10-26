<template>
  <header>
    <FormularioCronometro @emitSalvarTarefa="salvarProjeto" />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormularioCronometro from "./FormularioCronometro.vue";
import { useStore } from "@/store";
import { ALTERAR_PROJETOS } from "@/store/tipo.acoes";
import IProjeto from "@/interfaces/IProjeto";

export default defineComponent({
  name: "MenuLateral",
  components: {
    FormularioCronometro,
  },
  setup(props) {
    const store = useStore();

    const salvarProjeto = function (projeto: IProjeto) {
      store.dispatch(ALTERAR_PROJETOS, projeto);
    };

    return {
      store,
      salvarProjeto,
    };
  },
});
</script>

<style scoped>
header {
  text-align: center;
  padding: 1rem;
  background: var(--bg-menu);
  width: 100%;
  height: 100%;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
