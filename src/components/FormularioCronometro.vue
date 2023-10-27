<template>
  <header>
    <Temporizador
      @temporizadorFim="finalizarTarefa"
      :projetoSelecionado="idProjeto"
    />
    <div class="column" role="form" aria-label="Nova Tarefa">
      <div class="select">
        <select class="custom-select" v-model="idProjeto">
          <option value="">Selecione o projeto</option>
          <option
            :value="projeto.id"
            v-for="projeto in projetos"
            :key="projeto.id"
          >
            {{ projeto.name }}
          </option>
        </select>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import Temporizador from "./Temporizador.vue";
import { key } from "@/store";
import Modal from "./Modal.vue";
import useNotificador from "@/hooks/notificador";

export default defineComponent({
  name: "FormularioCronometro",
  components: {
    Temporizador,
    Modal,
  },
  emits: ["emitSalvarTarefa"],
  data() {
    return {
      modoEscuro: false,
    };
  },
  setup(props, { emit }) {
    const store = useStore(key);
    const projetos = computed(() => store.state.projeto.projetos);
    const descricaoTarefa = ref("");
    const idProjeto = ref("");
    const { notificar } = useNotificador();

    const finalizarTarefa = function (tempoDecorrido: number): void {
      const projeto = projetos.value.find((p) => p.id == idProjeto.value);
      if (!projeto) {
        notificar(
          TipoNotificacao.ATENCAO,
          "Projeto",
          "Selecione um projeto antes de finalizar a tarefa!"
        );
      } else {
        const projeto = projetos.value.find(
          (proj) => proj.id == idProjeto.value
        );

        const tempo = {
          date: new Date().toLocaleDateString("pt-BR"),
          time: tempoDecorrido,
        };

        const dto = {
          id: projeto?.id,
          name: projeto?.name,
          timeSpent: tempo,
        };

        emit("emitSalvarTarefa", dto);
      }
    };

    return {
      descricaoTarefa,
      idProjeto,
      projetos,
      finalizarTarefa,
      projetoSelecionado: idProjeto,
    };
  },
});
</script>

<style scoped>
select.custom-select {
  background-color: var(--bg-campo);
  color: var(--text-campo);
  border: none;
  text-align: center;
  width: 100vw;
}

input::placeholder {
  color: var(--text-campo);
  text-align: center;
}
</style>
