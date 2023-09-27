<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeProjeto" class="label">Nome do projeto</label>
        <input
          type="text"
          class="input"
          v-model="nomeProjeto"
          id="nomeProjeto"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import { CADASTRAR_PROJETOS, ALTERAR_PROJETOS } from "@/store/tipo.acoes";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "FormularioProjeto",
  props: {
    id: {
      type: String,
    },

  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const { notificar } = useNotificador();

    const nomeProjeto = ref("");

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        (proj) => proj.id == props.id
      );
      nomeProjeto.value = projeto?.nome || "";
    }

    const sucessoRota = function () {
      notificar(
        TipoNotificacao.SUCESSO,
        "Projeto",
        "Projeto salvo com sucesso!"
      );
      nomeProjeto.value = "";
      router.push("/projetos");
    };

    const erroRota = function () {
      notificar(TipoNotificacao.ERRO, "Projeto", "Erro ao salvar o projeto");
    };

    const salvar = function () {
      if (props.id) {
        /*Edição*/
        store
          .dispatch(ALTERAR_PROJETOS, {
            id: props.id,
            nome: nomeProjeto.value,
          })
          .then(sucessoRota)
          .catch(erroRota);
      } else {
        /*Adição*/
        store
          .dispatch(CADASTRAR_PROJETOS, nomeProjeto.value)
          .then(sucessoRota)
          .catch(erroRota);
      }
    };
    return {
      nomeProjeto,
      salvar,
    };
  },
});
</script>
