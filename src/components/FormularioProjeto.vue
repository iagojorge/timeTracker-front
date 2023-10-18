<template>
  <section>
      <div class="field is-grouped">
          <p class="control">
              <i class="fas fa-plus tema-button" @click="salvar" :class="{ 'icon-disabled': !nomeProjeto }"></i>
          </p>
        <p class="control is-expanded">
          <input
          type="text"
          class="input input-filtro"
          placeholder="Nome do projeto"
          v-model="nomeProjeto"
          id="nomeProjeto"
        />
        </p>
      </div>

  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import { CADASTRAR_PROJETOS, ALTERAR_PROJETOS} from "@/store/tipo.acoes";

export default defineComponent({
  name: "FormularioProjeto",
  props: {
    id: {
      type: String,
    },

  },
  setup(props) {
    const store = useStore();
    const { notificar } = useNotificador();

    const nomeProjeto = ref("");

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        (proj) => proj._id == props.id
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
      location.reload();
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

<style scoped>

.input-filtro{
  background-color: var( --bg-campo);
  color: var(--text-campo);
  border: none;
}

.input-filtro::placeholder{
  color: var(--text-campo);
}

.tema-button{
  font-size: 40px;
  cursor: pointer;
  color: var(--texto-secundario);
}

.icon-disabled {
  opacity: 0.5; 
  pointer-events: none; 
}

</style>
