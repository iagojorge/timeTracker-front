<template>
  <section>
    <box>
      <div class="columns">
        <div class="column is-4">
          <h1 class="texto-projeto">{{ projeto.name || "N/D" }}</h1>
        </div>
        <div class="column is-4">
          <Cronometro :tempoSegundos="projeto.timeTotalToday">
            <template v-slot:tempoDia>
              <h1 class="texto-tempo">HOJE</h1>
            </template>
          </Cronometro>
        </div>
        <div class="column is- 4">
          <Cronometro :tempoSegundos="projeto.timeTotalProject">
            <template v-slot:tempoDia>
              <h1 class="texto-tempo">TOTAL</h1>
            </template>
          </Cronometro>
        </div>
        <div class="icons">
          <i class="fa-solid fa-pen margin" @click="projetoClicado"></i>
          <i
            class="fa-solid fa-trash"
            @click="excluir(projeto.id, projeto.name)"
          ></i>
        </div>
      </div>
    </box>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { useStore } from "@/store";
import Cronometro from "./Cronometro.vue";
import { DELETAR_PROJETOS } from "@/store/tipo.acoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import Box from "./Box.vue";
import IProjeto from "@/interfaces/IProjeto";

export default defineComponent({
  name: "ListaProjeto",
  components: {
    Box,
    Cronometro,
  },
  emits: ["aoProjetoClicado"],
  props: {
    projeto: {
      type: Object as PropType<IProjeto>,
      required: true,
    },
  },
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
    projetoClicado(): void {
      this.$emit("aoProjetoClicado", this.projetos);
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
.texto-tempo {
  color: var(--texto-primario);
  text-align: center;
  font-family: Inter;
  font-size: 1.5vw;
  font-style: normal;
  line-height: 20px;
}

.texto-projeto {
  color: var(--texto-primario);
  text-align: center;
  font-family: Inter;
  font-size: 1.5vw;
  font-style: normal;
  margin-top: 8%;
  text-transform: uppercase;
}

.icons {
  font-size: 1.6vw;
}

.icons > i {
  display: block;
  cursor: pointer;
}

.margin {
  margin-bottom: 5vw;
}
</style>
