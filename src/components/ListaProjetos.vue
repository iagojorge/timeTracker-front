<template>
  <section>
    <router-link to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo projeto</span>
    </router-link>
    <table class="table is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <router-link :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <button
              class="button ml-2 is-danger"
              @click="excluir(projeto.id, projeto.nome)"
            >
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">

import { defineComponent, computed } from "vue";
import { useStore } from "@/store";
import { DELETAR_PROJETOS } from "@/store/tipo.acoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import { OBTER_PROJETOS } from "@/store/tipo.acoes";

export default defineComponent({
  name: "ListaProjeto",
  methods: {
    excluir(id: string, nome: string) {
      this.store
        .dispatch(DELETAR_PROJETOS, id)
        .then(() => {
          this.notificar(
            TipoNotificacao.SUCESSO,
            "Projeto",
            "Projeto " + nome + " deletado com sucesso!"
          );
        })
        .catch(() => {
          this.notificar(
            TipoNotificacao.ERRO,
            "Projeto",
            "Erro ao deletar o projeto " + nome
          );
        });
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    store.dispatch(OBTER_PROJETOS);
    return {
      projetos: computed(() => store.state.projeto.projetos),
      store,
      notificar,
    };
  },
});

</script>
