<template>
  <section>
    <box>
      <div class="columns clicavel" @click="projetoClicado">
        <div class="column is-4">
          <h1 class="texto-tempo">Estudando Vue.js3</h1>
        </div>
        <div class="column is-4">
          <Cronometro :tempoSegundos="projeto.tempoDia">
            <template v-slot:tempoDia>
              <h1 class="texto-tempo">HORAS TRABALHADAS HOJE</h1>
            </template>
          </Cronometro>
        </div>
        <div class="column is- 4">
          <Cronometro :tempoSegundos="projeto.tempoTotal">
            <template v-slot:tempoDia>
              <h1 class="texto-tempo">HORAS TRABALHADAS TOTAL</h1>
            </template>
          </Cronometro>
        </div>
      </div>
    </box>
  </section>
</template>

<script lang="ts">

import { defineComponent, computed, PropType} from "vue";
import { useStore } from "@/store";
import Cronometro from "./Cronometro.vue";
import { DELETAR_PROJETOS } from "@/store/tipo.acoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import { OBTER_PROJETOS } from "@/store/tipo.acoes";
import Box from "./Box.vue";
import IProjeto from "@/interfaces/IProjeto";


export default defineComponent({
  name: "ListaProjeto",
  components: {
    Box,
    Cronometro
  },  
  emits:['aoProjetoClicado'],
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
    }
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

<style scoped>
  .texto-tempo{
    color: white;
    text-align: center;
    font-feature-settings: 'cv11' on, 'cv01' on, 'ss01' on;
    font-family: Inter;
    font-size: 30px;
    font-style: normal;
    line-height: 20px;
  }


.texto-nav{
  color: #2D2D2D;
  text-align: center;
  font-feature-settings: 'cv11' on, 'cv01' on, 'ss01' on;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: bold;
  line-height: 20px; /* 142.857% */
}
</style>