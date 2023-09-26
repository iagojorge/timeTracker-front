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
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador'
import { CADASTRAS_PROJETOS, ALTERAR_PROJETOS } from '@/store/tipo.acoes';

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
                this.store.dispatch(ALTERAR_PROJETOS, {
                    id: this.id,
                    nome: this.nomeProjeto
                }).then(this.sucessoRota).catch(this.sucessoRota)
            }else{
                /*Adição*/
                this.store.dispatch(CADASTRAS_PROJETOS, this.nomeProjeto)
                    .then(this.sucessoRota).catch(this.erroRota)
            }
        },
        sucessoRota () {
            this.notificar(TipoNotificacao.SUCESSO, 'Projeto', 'Projeto salvo com sucesso!')
                this.nomeProjeto = ""
                this.$router.push('/projetos')
        },
        erroRota() {
            this.notificar(TipoNotificacao.ERRO, 'Projeto', 'Erro ao salvar o projeto')
        }
    },
    setup () {
        const store = useStore()
        const { notificar } = useNotificador()
        return {
            store,
            notificar
        }
    }
})

</script>