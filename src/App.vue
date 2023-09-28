<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'modo-escuro': modoEscuroAtivo }"
  >
    <div class="column is-one-quarter">
      <MenuLateral @temaAlterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <MenuSuperior/>
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
  --bg-primario: #171616;
  --texto-primario: #cd7e75;
}

main.modo-escuro {
  --bg-primario: #171616;
  --texto-primario: #cd7e75;
}

.column.is-one-quarter {
  box-shadow: 5px 0 10px rgba(0, 0, 0, 0.1);
}

.conteudo {
  background-color: var(--bg-primario);
}

</style>
