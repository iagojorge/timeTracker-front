<template>
  <div class="projetos">
    <FormularioProjeto />
    <ListaProjetos
      v-for="(projeto, index) in projetos"
      :key="index"
      :projeto="projeto"
      @aoProjetoClicado="selecionarProjeto(projeto)"
    />
  </div>
  <Modal :mostrar="projetoSelecionado != null" v-if="projetoSelecionado">
    <template v-slot:cabecalho>
      <p class="modal-card-title">Editar</p>
      <button class="delete" aria-label="close" @click="close"></button>
    </template>
    <template v-slot:corpo>
      <div class="field">
        <label for="descricaoTarefa" class="label">Descrição</label>
        <input
          type="text"
          class="input"
          v-model="projetoSelecionado.name"
          id="nomeProjeto"
        />
      </div>
    </template>
    <template v-slot:footer>
      <button class="button is-success" @click="editarProjeto">Salvar</button>
      <button class="button is-danger" @click="close()">Cancelar</button>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Modal from "@/components/Modal.vue";
import IProjeto from "@/interfaces/IProjeto";
import FormularioProjeto from "@/components/FormularioProjeto.vue";
import ListaProjetos from "@/components/ListaProjetos.vue";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import { useStore } from "@/store";
import { ALTERAR_PROJETOS, OBTER_PROJETOS } from "@/store/tipo.acoes";

export default defineComponent({
  name: "Projetos",
  components: {
    Modal,
    FormularioProjeto,
    ListaProjetos,
  },
  data() {
    return {
      projetoSelecionado: null as IProjeto | null,
    };
  },
  methods: {
    close() {
      this.projetoSelecionado = null;
      this.store.dispatch(OBTER_PROJETOS);
    },
    selecionarProjeto(projeto: IProjeto) {
      this.projetoSelecionado = projeto;
    },
    editarProjeto() {
      this.store
        .dispatch(ALTERAR_PROJETOS, this.projetoSelecionado)
        .then(() => {
          this.notificar(
            TipoNotificacao.SUCESSO,
            "Projeto",
            "Projeto alterada com sucesso!"
          );
          this.close();
        })
        .catch(() => {
          this.notificar(
            TipoNotificacao.ERRO,
            "Projeto",
            "Erro ao alterar o Projeto"
          );
        });
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();

    return {
      projetos: computed(() => store.state.projeto.projetos),
      store,
      notificar,
    };
  },
});
</script>

<style scoped>
.projetos {
  width: 100%;
  min-height: 90vh;
  height: 100%;
  padding: 1.25rem;
  padding-right: 3%;
  box-sizing: border-box;
}

.input {
  background: var(--bg-campo);
  border: none;
  color: var(--text-campo);
}
</style>
