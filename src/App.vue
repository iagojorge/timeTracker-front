<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'modo-escuro': modoEscuroAtivo }"
  >
    <div class="column is-one-quarter menu-lateral">
      <MenuLateral/>
    </div>
    <div class="column is-three-quarter conteudo">
      <MenuSuperior @temaAlterado="trocarTema"/>
      <!-- Rota do view -->
      <Notificacao />
      <RouterView></RouterView>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuLateral from "@/components/MenuLateral.vue";
import Notificacao from "@/components/Notificacoes.vue";
import MenuSuperior from "./components/MenuSuperior.vue";

export default defineComponent({
  name: "App",
  components: {
    MenuLateral,
    Notificacao,
    MenuSuperior
},
  data() {
    return {
      modoEscuroAtivo: true,
    };
  },
  methods: {
    trocarTema(modoEscuro: boolean) {
      this.modoEscuroAtivo = modoEscuro;
    },
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

.teste {
  position: sticky;
}

main {
  --bg-primario: #white;
  --texto-primario: #cd7e75;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

main.modo-escuro {
  --bg-primario: #171616;
  --texto-primario: #cd7e75;
}

.conteudo {
  background-color: var(--bg-primario);
}
.menu-lateral{
  z-index: 2;
}

@font-face {
  font-family: 'Inter';
  src: url('./assets/font/Inter-VariableFont_slnt\,wght.ttf') format('truetype');
}


</style>
