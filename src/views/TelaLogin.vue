<template>
    <main>
        <div class="main-login">
            <div class="left-login">
                <h1>Faça login<br>E venha conhecer o TimeTracker</h1>
                <img src="../assets/save-time-animate.svg" class="login-image" alt="Time animação">
            </div>
            <div class="right-login" v-if="!registro">
                <div class="card-login">
                    <h1>Login</h1>
                    <div class="textfield">
                        <label for="usuario">E-mail</label>
                        <input type="text" name="email" placeholder="E-mail" v-model="email">
                    </div>
                    <div class="textfield">
                        <label for="senha">Senha</label>
                        <input type="password" name="password" placeholder="Senha" v-model="password">
                    </div>
                    <button class="btn-login" @click="login">Login</button>
                    <h2 @click="registrar">Registre-se</h2>
                </div>
            </div>
            <div class="right-login" v-if="registro">
                <div class="card-login">
                    <h1>Cadastro</h1>
                    <div class="textfield">
                        <label for="usuario">Nome de usuário</label>
                        <input type="text" name="nome" placeholder="Nome de usuário" v-model="user">
                    </div>
                    <div class="textfield">
                        <label for="usuario">E-mail</label>
                        <input type="email" name="email" placeholder="E-mail" v-model="email">
                    </div>
                    <div class="textfield">
                        <label for="senha">Senha</label>
                        <input type="password" name="password" placeholder="Senha" v-model="password">
                    </div>
                    <div class="textfield">
                        <label for="senha">Confirme a senha</label>
                        <input type="password" name="passwordConfirm" placeholder="Confirme a senha" v-model="passwordConfirm">
                    </div>
                    <button class="btn-login" @click="cadastro">Cadastre-se</button>
                    <h2 @click="registrar">Já tem conta? Faça login</h2>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { store } from '@/store';
import { defineComponent, ref, inject  } from 'vue';
import { LOGIN, CADASTRO } from '@/store/tipo.acoes';
import { useRouter  } from 'vue-router';

export default defineComponent({
    name: "TelaLogin",
    data(){
        return {
            registro: false,
      };
    },
    methods:{
        registrar(){
            this.registro = !this.registro
        }
    },
    setup(){
        const user = ref("");
        const password = ref("");
        const email = ref("");
        const passwordConfirm = ref ("");

        const router = useRouter()

        const login = function () {
            store.dispatch(LOGIN, {
                email: email.value,
                password: password.value
            }).then((res) =>{
                const token = res.data.token
                const name = res.data.name
                const userId = res.data.id
                localStorage.setItem('token', token);
                localStorage.setItem('name', name);
                localStorage.setItem('userId', userId)
                router.push('/');
            })
        }

        const cadastro = function (){
            store.dispatch(CADASTRO, {
               name: user.value,
               email: email.value,
               password: password.value,
               confirmPassword: passwordConfirm.value 
            }).then(() => {
                login()
            })
        } 

        return {
            user,
            password,
            email,
            passwordConfirm,
            login,
            cadastro
        }
    }
})
</script>


<style scoped>

main * {
    box-sizing: border-box;
}

.main-login{
    width: 100vw;
    height: 100vh;
    background: #171616;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Inter;
}

.left-login{
    width: 50vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.left-login > h1 {
    color: #FFFFFF;
    font-size: 3vw;
    font-weight: 600;
}

.login-image{
    width: 35vw;
}

.right-login{
    width: 50vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-login > h1 {
    color: #FFFFFF;
    font-weight: 800;
    font-size: 30pt;
    margin: 0;
}

.card-login > h2 {
    color: #FFFFFF;
    font-size: 11pt;
    margin: 0;
    transition: color 0.3s;
}
.card-login > h2:hover {
    color: rgb(57, 102, 249);
    cursor: pointer;
}

.card-login{
   width: 60%;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   padding: 30px 35px; 
   background: #2D2D2D;
   border-radius: 20px;
   box-shadow: 0px 10px 40px #00000056;
}

.textfield {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 10px 0px;
}

.textfield > input{
    width: 100%;
    border: none;
    border-radius: 10px;
    padding: 15px;
    background-color: #1e1e1e;
    color: #f0ffffde;
    font-size: 12pt;
    box-shadow: 0px 10px 40px #00000056;
    outline: none;
    box-sizing: border-box;
}

.textfield > label {
    color: #f0ffffde;
    margin-bottom: 10px;
}

.btn-login{
    width: 100%;
    padding: 16px 0px;
    margin: 25px;
    border: none;
    border-radius: 8px;
    outline: none;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 3px;
    cursor: pointer;
    box-shadow: 0px 10px 40px -12px #f0ffffde;
}

@media only screen and (max-width: 950px){
    .card-login{
        width: 85%;
    }
}

@media only screen and (max-width: 600px){
    .main-login{
        flex-direction: column;
    }

    .left-login > h1{
        display: none;
    }

    .left-login{
        width: 100%;
        height: auto;
    }

    .right-login{
        width: 100%;
        height: auto;
    }

    .login-image{
        width: 30vh;
    }


}

@media only screen and (min-width: 2000px) {
    .login-image{
        width: 70vh;
    }

    .left-login > h1{
        font-size: 2vw;
        font-weight: 600;
    }
}

</style>