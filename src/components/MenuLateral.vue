<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="">
        </h1>
        <button class="button" @click="alterarTema">
          {{ textoTema }}
        </button>
        <nav class="panel mt-5">
          <ul>
            <li>
              <RouterLink to="/" class="link">
                <i class="fas fa-tasks"></i>
                tarefas
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/projetos" class="link">
                <i class="fas fa-project-diagram"></i>
                projetos
              </RouterLink>
            </li>
          </ul>
        </nav>
    </header>
</template>

<script lang="ts">
 import { defineComponent } from 'vue';

 export default defineComponent({
    name: 'MenuLateral',
    emits: ['temaAlterado'],
    data (){
      return {
        modoEscuro: false
      }
    },
    computed: {
      textoTema () {
        if (this.modoEscuro){
          return 'Desativar modo escuro'
        }else{
          return 'Ativar modo escuro'
        }
      }
    },
    methods:{
      alterarTema() {
        this.modoEscuro = !this.modoEscuro;
        this.$emit('temaAlterado', this.modoEscuro);
      }
    }
 })
</script>

<style scoped>
header {
    text-align: center;
    padding: 1rem;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
  }
  @media only screen and (max-width: 768px) {
    header {
      padding: 2.5rem;
      height: auto;
    }
  }
  .panel li {
    margin: 8px 0;
  }
  .link {
      color: #fff;
  }
  .link:hover {
      color: #FAF0CA;
  }
  .link.router-link-active {
      color: #FAF0CA;
  }
</style>