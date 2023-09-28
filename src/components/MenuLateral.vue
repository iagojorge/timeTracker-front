<template>
  <header>
      <FormularioCronometro @emitSalvarTarefa="salvarTarefa"/>
      <nav class="panel mt-5">
        <ul>
          <li>
            <RouterLink to="/" class="link">
              <i class="fas fa-tasks"></i>
              tarefas
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/projetos" class="link">
              <i class="fas fa-project-diagram"></i>
              projetos
            </RouterLink>
          </li>
        </ul>
      </nav>
  
      <i class="fa-solid fa-moon temaButton" @click="alterarTema" v-if="!modoEscuro"></i>
      <i class="fa-solid fa-sun temaButton" @click="alterarTema"  v-if="modoEscuro"></i>
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
  emits: ["temaAlterado"],
  data() {
    return {
      modoEscuro: false,
    };
  },
  computed: {
    textoTema() {
      if (this.modoEscuro) {
        return "Desativar modo escuro";
      } else {
        return "Ativar modo escuro";
      }
    },
  },
  methods: {
    alterarTema() {
      this.modoEscuro = !this.modoEscuro;
      this.$emit("temaAlterado", this.modoEscuro);
    },
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
.panel li {
  margin: 8px 0;
}
.link {
  color: #fff;
}
.link:hover {
  color: #faf0ca;
}
.link.router-link-active {
  color: #faf0ca;
}

.temaButton {
  font-size: 50px;
  color: white;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  height: 150px;
  padding: 100px;
  z-index: 105;
}
</style>
