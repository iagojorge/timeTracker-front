<template>
  <body>
    <main :class="{ 'modo-escuro': modoEscuroAtivo }">
     <div class="main-layout">
       <div class="menu-lateral">
         <MenuLateral/>
       </div>
       <div class="conteudo">
        <MenuSuperior @temaAlterado="trocarTema"/>
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

  body * {
    box-sizing: border-box;
}

body {
    height: 100%;
    margin: 0;
    padding: 0;
}
  
  main {
    --bg-primario: #171616;
    --texto-primario: #FFFFFF;
    --texto-secundario:#2D2D2D;
    --bg-secundario: #2D2D2D;
    --bg-campo: #2D2D2D;
    --bg-menu: #1e1e1e;
    --text-campo: #9E9E9E;
    --texto-selecionado: #FFFFFF;
    background: #1e1e1e;
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
    background: #4FD1C5;
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

  .menu-lateral{
    width: 25%;
    height: 100%;
    z-index: 2;
  }
  
  @font-face {
    font-family: 'Inter';
    src: url('@/assets/font/Inter-VariableFont_slnt\,wght.ttf') format('truetype');
  }
  
  @font-face {
    font-family: 'relogio-fonte';
    src: url('@/assets/font/DS-DIGI.TTF') format('truetype');
    /* Adicione outros formatos da fonte, se necessário */
  }
  
  </style>
  