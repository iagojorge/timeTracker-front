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
                placeholder="Buscar tarefa"
                v-model="filtro"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-search"></i>
              </span>
            </p>
          </div>
        </div>
        <div class="column is-1">
          <i
            class="fa-solid fa-moon temaButton"
            :class="{'fa-flip': flip}"
            @click="alterarTema"
            v-if="!modoEscuro"
          ></i>
          <i
            class="fa-solid fa-sun temaButton"
            :class="{'fa-flip': flip}"
            @click="alterarTema"
            v-if="modoEscuro"
          ></i>
          <i class="fa-solid fa-arrows-rotate temaButton"  @click="refresh" :class="{ 'fa-spin': girando }"></i>
        </div>
        <div class="column is-2">
          <i class="fa-solid fa-user temaButton"> Username</i>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { useStore } from "@/store";
export default defineComponent({
  name: "MenuSuperior",
  emits: ["temaAlterado"],
  data() {
    return {
      modoEscuro: false,
      flip: false,
      girando: false
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
    }
  },
  setup(){
    const store = useStore();
    const filtro = ref("");
    let girando: boolean = false;
  

    watchEffect(() => {
    
    });

    return{
       filtro
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
    background-color: #2D2D2D;
    color: #9E9E9E;
    border: none;
  }

.input-filtro::placeholder{
  color:#9E9E9E
}

.filtro{
    margin-top: -10px;
}

.menu-options {
    margin-left: 10px;
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

.texto-nav-active {
    color: #FFFFFF;
    border-bottom: 1px groove white;
   
  }

.temaButton{
    font-size: 30px;
    cursor: pointer;
    margin-right: 30px;
}
</style>
