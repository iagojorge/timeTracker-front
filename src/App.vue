<template>
  <main
    class="columns is-gapless is-multiline teste"
    :class="{ 'modo-escuro': modoEscuroAtivo }">
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
      modoEscuroAtivo: false,
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

main {
  --bg-primario: #171616;
  --texto-primario: #FFFFFF;
  --texto-secundario:#2D2D2D;
  --bg-secundario: #2D2D2D;
  --bg-campo: #2D2D2D;
  --bg-menu: #1e1e1e;
  --text-campo: #9E9E9E;
  --texto-selecionado: #FFFFFF;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

main.modo-escuro {
  --bg-primario: #FFFFFF;
  --texto-primario: #111;
  --texto-secundario:#111;
  --bg-secundario: #4FD1C5;
  --bg-campo: #FFFFFF;
  --bg-menu: #4FD1C5;
  --text-campo: #111;
  --texto-selecionado: #4FD1C5;
}

.conteudo {
  background-color: var(--bg-primario);
  width: 100%;
  padding-right: 0;
  padding-left: 0;
}
.menu-lateral{
  z-index: 2;
}

@font-face {
  font-family: 'Inter';
  src: url('./assets/font/Inter-VariableFont_slnt\,wght.ttf') format('truetype');
}

@font-face {
  font-family: 'relogio-fonte';
  src: url('./assets/font/DS-DIGI.TTF') format('truetype');
  /* Adicione outros formatos da fonte, se necessário */
}

</style>
