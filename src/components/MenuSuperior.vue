<template>
  <div class="columns menu-superior">
    <div class="column is-3 menu-options">
      <RouterLink
        to="/"
        class="texto-nav"
        :class="{ 'texto-nav-active': $route.path === '/' }"  
        >
        Dashboard
      </RouterLink>
      /
      <RouterLink
        to="/projetos"
        class="texto-nav"
        :class="{ 'texto-nav-active': $route.path === '/projetos' }"
      >
        Projetos
      </RouterLink>
      
      
      <div class="dropdown is-right is-hoverable icon-dropdown"  v-if="larguraTela < 900">
          <i class="fa-solid fa-bars icon-dropdown"  aria-controls="dropdown-menu4"></i>
        <div class="dropdown-menu" id="dropdown-menu4" role="menu">
          <div class="dropdown-content dropdownCustom">
            <a href="#" class="dropdown-item dropdownCustom" @click="alterarTema" v-if="!modoEscuro">
              Tema claro
            </a>
            <a href="#" class="dropdown-item dropdownCustom" @click="alterarTema" v-if="modoEscuro">
              Tema escuro
            </a>
            <a href="#" class="dropdown-item dropdownCustom" @click="logout">
              Sair
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <div class="column is-6" v-if="larguraTela >=900">

    </div>
    <div class="column is-1" v-if="larguraTela >= 900">
      <i
        class="fa-solid fa-moon temaButton margin"
        :class="{ 'fa-flip': flip }"
        @click="alterarTema"
        v-if="modoEscuro"
      ></i>
      <i
        class="fa-solid fa-sun temaButton margin"
        :class="{ 'fa-flip': flip }"
        @click="alterarTema"
        v-if="!modoEscuro"
      ></i>
      <i
        class="fa-solid fa-arrows-rotate temaButton"
        @click="refresh"
        :class="{ 'fa-spin': girando }"
      ></i>
    </div>
    <div class="column is-1" v-if="larguraTela >= 900">
      <div class="dropdown is-hoverable is-right">
        <div class="dropdown-trigger">
            <i class="fa-solid fa-user temaButton" aria-controls="dropdown-menu4">{{ name }}</i>
        </div>
        <div class="dropdown-menu" id="dropdown-menu4" role="menu">
          <div class="dropdown-content dropdownCustom">
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
import { defineComponent} from "vue";
export default defineComponent({
  name: "MenuSuperior",
  emits: ["temaAlterado"],
  data() {
    return {
      modoEscuro: false,
      flip: false,
      girando: false,
      disableInput: true,
      larguraTela: window.innerWidth,
      name: localStorage.getItem("name"),
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
    refresh() {
      this.girando = true;
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    logout() {
      localStorage.clear();
      this.refresh();
    },
    atualizarLarguraTela() {
      this.larguraTela = window.innerWidth;
    },
  },
  mounted() {
    window.addEventListener("resize", this.atualizarLarguraTela);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.atualizarLarguraTela);
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

.menu-options {
  margin-left: 10px;
}

.texto-nav {
  color: var(--texto-secundario);
  text-align: center;
  font-feature-settings: "cv11" on, "cv01" on, "ss01" on;
  font-family: Inter;
  font-size: 1.6vw;
  font-style: normal;
  font-weight: bold;
  line-height: 20px;
}

.texto-nav-active {
  color: var(--texto-selecionado);
  border-bottom: 1px groove white;
}

.temaButton {
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

.dropdownCustom {
  background-color: var(--bg-primario);
}

.dropdown-item:hover {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}

.margin {
  margin-right: 1vw;
}

.icon-dropdown{
  position: absolute;
  right: 0;
  margin-right: 4vw;
  font-size: 30px;
  top: 10;
}

@media only screen and (max-width: 900px) {
  .texto-nav {
    font-size: 2.2vw;
  }

  .dropdown-menu{
    margin-top: 30px;
  }
}

@media only screen and (max-width: 600px) {
  .texto-nav {
    font-size: 4vw;
  }
}
</style>
