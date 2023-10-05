<template>
    <main>
        <div class="main-login">
            <div class="left-login">
                <h1>Faça login<br>E venha conhecer o TimeTracker</h1>
                <img src="../assets/save-time-animate.svg" class="login-image" alt="Time animação">
            </div>
            <div class="right-login">
                <div class="card-login">
                    <h1>Login</h1>
                    <div class="textfield">
                        <label for="usuario">Usuário</label>
                        <input type="text" name="usuario" placeholder="Usuário">
                    </div>
                    <div class="textfield">
                        <label for="senha">Senha</label>
                        <input type="passowrd" name="senha" placeholder="Senha">
                    </div>
                    <button class="btn-login">Login</button>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: "TelaLogin"
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
    font-size: 30px;
    margin: 0;
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

</style>