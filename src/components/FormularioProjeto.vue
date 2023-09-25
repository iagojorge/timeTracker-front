<template>
    <section>
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
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { ADICIONA_PROJETO, EDITAR_PROJETO } from "@/store/tipo-mutacoes";

export default defineComponent({
    name: 'FormularioProjeto',
    data(){
        return{
            nomeProjeto: "",
        }
    },
    props: {
        id: {
            type: String
        }
    },
    mounted () {
        if(this.id){
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
            this.nomeProjeto = projeto?.nome || ''
        }
    },
    methods: {
        salvar(){
            if(this.id){
            /*Edição*/
                this.store.commit(EDITAR_PROJETO,{
                    id: this.id,
                    nome: this.nomeProjeto
                })
            }else{
                /*Adição*/
                this.store.commit(ADICIONA_PROJETO, this.nomeProjeto)
                this.nomeProjeto = ""
            }
            this.$router.push('/projetos')
        }
    },
    setup () {
        const store = useStore()
        return {
            store,
        }
    }
})

</script>