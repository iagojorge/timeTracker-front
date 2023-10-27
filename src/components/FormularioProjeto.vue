<template>
  <section>
    <div class="field filtro is-grouped">
      <p class="control has-icons-left has-icons-right is-expanded">
        <input
          class="input input-filtro"
          type="text"
          placeholder="Buscar projeto"
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
      <p class="control">
        <i
          class="fas fa-plus tema-button"
          @click="open"
        ></i>
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { useStore } from "@/store";
import Modal from "./Modal.vue";
import {
  OBTER_PROJETOS,
} from "@/store/tipo.acoes";

export default defineComponent({
  name: "FormularioProjeto",
  components: {
    Modal
  },
  props: {
    id: {
      type: String,
    },
  },
  emits: ["aoCriarProjeto"],
  methods: {
    adicionar(): void {
      this.$emit("aoCriarProjeto");
    },
    close() {
      this.abrirModal = false;
      this.store.dispatch(OBTER_PROJETOS);
    },
    open(){
      this.$emit("aoCriarProjeto");
    }
  },
  data(){
    return{
      abrirModal: false,
    }
  },
  setup(props) {
    const store = useStore();
    const filtro = ref("");

    const nomeProjeto = ref("");

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        (proj) => proj.id == props.id
      );
      nomeProjeto.value = projeto?.name || "";
    }

    watchEffect(() => {
      store.dispatch(OBTER_PROJETOS, filtro.value);
    });

    return {
      nomeProjeto,
      store,
      filtro
    };
  },
});
</script>

<style scoped>
.input-filtro {
  background-color: var(--bg-campo);
  color: var(--text-campo);
  border: none;
}

.input-filtro::placeholder {
  color: var(--text-campo);
}

.tema-button {
  font-size: 40px;
  cursor: pointer;
  color: var(--texto-secundario);
}

.icon-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
