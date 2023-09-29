<template>
    <header>
      <Temporizador @temporizadorFim="finalizarTarefa"/>
      <div class="column" role="form" aria-label="Nova Tarefa">
        
        <div class="space" role="form" aria-label="Descrição da Tarefa">
          <input
          type="text"
          class="input input-tarefa is-fullwidth"
          placeholder="Descrição da tarefa"
          v-model="descricaoTarefa"
          />
        </div>
        <div class="select">
          <select class="custom-select" v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
            :value="projeto.id"
            v-for="projeto in projetos"
            :key="projeto.id"
            >
            {{ projeto.nome }}
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
    Modal
    },    
    emits: ["emitSalvarTarefa"],
    data() {
      return {
        modoEscuro: false,
      };
    },  
    setup (props, { emit }){
  
      const store = useStore(key);
      const projetos = computed(() => store.state.projeto.projetos);
      const descricaoTarefa = ref("");
      const idProjeto = ref("");
      const { notificar } = useNotificador();
  
      const finalizarTarefa = function (tempoDecorrido: number): void {
        console.log(descricaoTarefa)
        const projeto = projetos.value.find((p) => p.id == idProjeto.value);
        console.log(projeto)
        if (!projeto) {
          console.log("caiu")
          notificar(
            TipoNotificacao.ATENCAO,
            "Projeto",
            "Selecione um projeto antes de finalizar a tarefa!"
          );
        } else {
          console.log(emit)
          emit("emitSalvarTarefa", {
            tempoTarefa: tempoDecorrido,
            descricao: descricaoTarefa.value,
            projeto: projetos.value.find((proj) => proj.id == idProjeto.value),
          });
          descricaoTarefa.value = "";
        }
      };
      return{
        descricaoTarefa,
        idProjeto,
        projetos,
        finalizarTarefa,
      }
    }
  });
  </script>
  
  <style scoped>
    .input-tarefa{
      background-color: #2D2D2D;
      color: #9E9E9E;
      border: none;
      text-align: center;
    }

    select.custom-select {
      background-color: #2D2D2D;
      color: #9E9E9E;
      border: none;
      text-align: center;
      width: 1000px;
  }

  .space{
    padding-top: 10px;
    padding-bottom: 10px;
  }
    input::placeholder {
      color: #9E9E9E;
      text-align: center;
    }

  </style>
  