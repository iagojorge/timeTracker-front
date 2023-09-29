<template>
  <header>
      <FormularioCronometro @emitSalvarTarefa="salvarTarefa"/>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormularioCronometro from './FormularioCronometro.vue'
import ITarefa from "@/interfaces/ITarefa";
import { useStore } from "@/store";
import { CADASTRAR_TAREFAS } from "@/store/tipo.acoes";

export default defineComponent({
  name: "MenuLateral",
  components:{
    FormularioCronometro
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFAS, tarefa);
    },
  },
  setup(){
    const store = useStore();
    return{
      store
    }
  }
});
</script>

<style scoped>
header {
  text-align: center;
  padding: 1rem;
  background: #1e1e1e;
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
