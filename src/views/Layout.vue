<template>
  <body>
    <main :class="{ 'modo-escuro': modoEscuroAtivo }">
      <div class="main-layout">
        <div class="menu-lateral">
          <MenuLateral v-if="larguraTela > 900" />
        </div>
        <div class="conteudo">
          <MenuSuperior @temaAlterado="trocarTema" />
          <div class="menu-lateral">
            <MenuLateral v-if="larguraTela <= 900" />
          </div>
          <!-- Rota do view -->
          <Notificacao />
          <RouterView></RouterView>
        </div>
      </div>
    </main>
  </body>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuLateral from "@/components/MenuLateral.vue";
import Notificacao from "@/components/Notificacoes.vue";
import MenuSuperior from "@/components/MenuSuperior.vue";

export default defineComponent({
  name: "Layout",
  components: {
    MenuLateral,
    Notificacao,
    MenuSuperior,
  },
  data() {
    return {
      modoEscuroAtivo: false,
      larguraTela: window.innerWidth,
    };
  },
  methods: {
    trocarTema(modoEscuro: boolean) {
      this.modoEscuroAtivo = modoEscuro;
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
  },
});
</script>

<style>
body * {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

main {
  --bg-primario: #171616;
  --texto-primario: #ffffff;
  --texto-secundario: #2d2d2d;
  --bg-secundario: #2d2d2d;
  --bg-campo: #2d2d2d;
  --bg-menu: #1e1e1e;
  --text-campo: #9e9e9e;
  --texto-selecionado: #ffffff;
  background: #1e1e1e;
}

main.modo-escuro {
  --bg-primario: #ffffff;
  --texto-primario: #111;
  --texto-secundario: #111;
  --bg-secundario: #4fd1c5;
  --bg-campo: #ffffff;
  --bg-menu: #4fd1c5;
  --text-campo: #111;
  --texto-selecionado: #4fd1c5;
  background: #4fd1c5;
}

.main-layout {
  width: 101vw;
  min-height: 100vh;
  height: 100%;
  display: flex;
  margin: 0;
  padding: 0;
}

.conteudo {
  background-color: var(--bg-primario);
  width: 75%;
  height: 100%;
}

.menu-lateral {
  width: 25%;
  height: 100%;
  z-index: 2;
}

@font-face {
  font-family: "Inter";
  src: url("@/assets/font/Inter-VariableFont_slnt\,wght.ttf") format("truetype");
}

@font-face {
  font-family: "relogio-fonte";
  src: url("@/assets/font/DS-DIGI.TTF") format("truetype");
}

@media (max-width: 900px) {
  .main-layout {
    flex-direction: column;
  }

  .menu-lateral {
    width: 100%; 
    order: 3;
  }

  .conteudo {
    width: 100%;
  }
}
</style>
