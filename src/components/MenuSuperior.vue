<template>

  <div class="columns menu-superior">
        <div class="column is-3 menu-options">
          <RouterLink to="/" class="texto-nav" :class="{ 'texto-nav-active': $route.path === '/' }"> Dashboard </RouterLink>
          /
          <RouterLink to="/projetos" class="texto-nav" :class="{ 'texto-nav-active': $route.path === '/projetos' }"> Projetos </RouterLink>
        </div>
        <div class="column is-6">
          <div class="field filtro">
            <p class="control has-icons-left has-icons-right">
              <input
                class="input input-filtro"
                type="text"
                placeholder="Buscar projeto"
                v-model="filtro"
                :disabled="!disableInput"
                :class="{'is-static' : !disableInput }"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-search"></i>
              </span>
            </p>
          </div>
        </div>
        <div class="column is-1">
          <i
            class="fa-solid fa-moon temaButton margin"
            :class="{'fa-flip': flip}"
            @click="alterarTema"
            v-if="modoEscuro"
          ></i>
          <i
            class="fa-solid fa-sun temaButton margin"
            :class="{'fa-flip': flip}"
            @click="alterarTema"
            v-if="!modoEscuro"
          ></i>
          <i class="fa-solid fa-arrows-rotate temaButton"  @click="refresh" :class="{ 'fa-spin': girando }"></i>
        </div>
        <div class="column is-2">
          <div class="dropdown is-hoverable">
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                <i class="fa-solid fa-user temaButton">{{name}}</i>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu4" role="menu">
              <div class="dropdown-content dropdownCustom" >
                <a href="#" class="dropdown-item dropdownCustom" @click="logout">
                  Sair
                </a>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { useStore } from "@/store";
import { OBTER_PROJETOS } from "@/store/tipo.acoes";
export default defineComponent({
  name: "MenuSuperior",
  emits: ["temaAlterado"],
  data() {
    return {
      modoEscuro: false,
      flip: false,
      girando: false,
      disableInput: false
    };
  }, 
  methods: {
    alterarTema() {
      this.flip = true;
      this.modoEscuro = !this.modoEscuro;
      this.$emit("temaAlterado", this.modoEscuro);
      setTimeout(() => {
        this.flip = false;
    }, 1000);
    },
    refresh (){
        this.girando = true;
        setTimeout(() => {
        location.reload();
        }, 1000);
    },
    verificaRota(){
      if(window.location.hash === '#/projetos'){
            this.disableInput = true;
          }else{
            this.filtro = ""
            this.disableInput = false;
          }
    },
    logout(){
      localStorage.clear()
      this.refresh()
    }
  },  
  watch: {
    '$route': 'verificaRota',
  },
  setup(){
    const store = useStore();
    const filtro = ref("");

    const name = localStorage.getItem('name');

    watchEffect(() => {
      store.dispatch(OBTER_PROJETOS, filtro.value);
    });
  
    return{
       filtro,
       name
    }
  }
});
</script>

<style scoped>
.menu-superior {
    margin-top: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
    position: relative;
    z-index: 1;
}
.input-filtro{
    background-color: var(--bg-campo);
    color: var(--text-campo);
    border: none;
  }

input[disabled] {
  cursor: default;
}

.input-filtro::placeholder{
  color: var(--text-campo)
}

.filtro{
    margin-top: -10px;
}

.menu-options {
    margin-left: 10px;
}

.texto-nav{
    color: var(--texto-secundario);
    text-align: center;
    font-feature-settings: 'cv11' on, 'cv01' on, 'ss01' on;
    font-family: Inter;
    font-size: 1.5vw;
    font-style: normal;
    font-weight: bold;
    line-height: 20px; /* 142.857% */
}

.texto-nav-active {
    color: var(--texto-selecionado);
    border-bottom: 1px groove white;
   
  }

.temaButton{
    font-size: 1.3vw;
    cursor: pointer;
    color: var(--texto-secundario);
    background-color: var(--bg-primario);
}

.button {
  background-color: var(--bg-primario);
  border: none;
  outline: none;
  font-size: 0.5vw;
}

.dropdownCustom{
  background-color: var(--bg-primario);
}

.dropdown-item:hover{
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}

.margin{
  margin-right: 1vw;
}
</style>
