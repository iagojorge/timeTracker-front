<template>
  <div class="projetos">
    <FormularioProjeto/>
    <ListaProjetos 
    v-for="(projeto, index) in projetos"
    :key="index"
    :projeto="projeto"
    @aoProjetoClicado="selecionarProjeto"
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
          v-model="projetoSelecionado.nome"
          id="nomeProjeto"
        />
      </div>
    </template>
    <template v-slot:footer>
      <button class="button is-success" @click="editarProjeto">Salvar</button>
      <button class="button" @click="close">Cancelar</button>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Modal from "@/components/Modal.vue";
import IProjeto from "@/interfaces/IProjeto";
import FormularioProjeto from "@/components/FormularioProjeto.vue";
import ListaProjetos from "@/components/ListaProjetos.vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "Projetos",
  components:{
    Modal,
    FormularioProjeto,
    ListaProjetos
},  
  data() {
    return {
      projetoSelecionado: null as IProjeto | null,
    };
  },  
  methods: {
    close() {
      this.projetoSelecionado = null;
    },
    selecionarProjeto(projeto: IProjeto) {
      this.projetoSelecionado = projeto;
    },
    editarProjeto() {

    }
  },
  setup(){
    const store = useStore();

    return{
      projetos: computed(() => store.state.projeto.projetos),
    }
  }
});
</script>

<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>
