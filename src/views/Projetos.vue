<template>
    <section class="projetos">
        <h1 class="label">Projetos</h1>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeProjeto" class="label">Nome do projeto</label>
                <input
                    type="text"
                    class="input"
                    v-model="nomeProjeto"
                    id="nomeProjeto"
                />
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
        <table class="table is-fullwidth is-narrow">
            <thread>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                </tr>
            </thread>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
    name: 'Projetos',
    data(){
        return{
            nomeProjeto: "",
        }
    },
    methods: {
        salvar(){
            this.store.commit('ADICIONA_PROJETO', this.nomeProjeto)
            this.nomeProjeto = ""
        }
    },
    setup () {
        const store = useStore()
        return {
            store,
            projetos: computed(() => store.state.projetos)
        }
    }
})

</script>

<style scoped>
.projetos{
    padding: 1.25rem;
}
</style>