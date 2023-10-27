<template>
  <main>
    <div class="main-login">
      <div class="left-login">
        <h1>Faça login<br />E venha conhecer o TimeTracker</h1>
        <img
          src="../assets/save-time-animate.svg"
          class="login-image"
          alt="Time animação"
        />
      </div>
      <form @submit.prevent="login">
        <div
          class="right-login"
          v-if="!registro"
          :class="{ 'fade-out': fade, 'fade-in': !fade }"
        >
          <div class="card-login">
            <h1>Login</h1>
            <div class="textfield">
              <label for="usuario">E-mail</label>
              <input
                type="text"
                name="email"
                placeholder="E-mail"
                v-model="email"
                :class="{ 'error-border': typeError == 2 }"
              />
              <div class="error-message" v-if="typeError == 2">
                {{ errorMessage }}
              </div>
            </div>
            <div class="textfield">
              <label for="senha">Senha</label>
              <input
                type="password"
                name="password"
                placeholder="Senha"
                v-model="password"
                :class="{ 'error-border': typeError == 3 }"
              />
              <div class="error-message" v-if="typeError == 3">
                {{ errorMessage }}
              </div>
            </div>
            <button type="submit" class="btn-login" @click="login">
              Login
            </button>
            <h2 @click="registrar">Registre-se</h2>
          </div>
        </div>
      </form>
      <form @submit.prevent="cadastro">
        <div
          class="right-login"
          v-if="registro"
          :class="{ 'fade-out': !fade, 'fade-in': fade }"
        >
          <div class="card-login">
            <h1>Cadastro</h1>
            <div class="textfield">
              <label for="usuario">Nome de usuário</label>
              <input
                type="text"
                name="nome"
                placeholder="Nome de usuário"
                v-model="user"
                :class="{ 'error-border': typeError == 1 }"
              />
              <div class="error-message" v-if="typeError == 1">
                {{ errorMessage }}
              </div>
            </div>
            <div class="textfield">
              <label for="usuario">E-mail</label>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                v-model="email"
                :class="{ 'error-border': typeError == 2 }"
              />
              <div class="error-message" v-if="typeError == 2">
                {{ errorMessage }}
              </div>
            </div>
            <div class="textfield">
              <label for="senha">Senha</label>
              <input
                type="password"
                name="password"
                placeholder="Senha"
                v-model="password"
                :class="{ 'error-border': typeError == 3 }"
              />
              <div class="error-message" v-if="typeError == 3">
                {{ errorMessage }}
              </div>
            </div>
            <div class="textfield">
              <label for="senha">Confirme a senha</label>
              <input
                type="password"
                name="passwordConfirm"
                placeholder="Confirme a senha"
                v-model="passwordConfirm"
                :class="{ 'error-border': typeError == 4 }"
              />
              <div class="error-message" v-if="typeError == 4">
                {{ errorMessage }}
              </div>
            </div>
            <button type="submit" class="btn-login" @click="cadastro">
              Cadastre-se
            </button>
            <h2 @click="registrar">Já tem conta? Faça login</h2>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script lang="ts">
import { store } from "@/store";
import { defineComponent, ref } from "vue";
import { LOGIN, CADASTRO } from "@/store/tipo.acoes";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "TelaLogin",
  data() {
    return {
      registro: false,
      fade: false,
    };
  },
  methods: {
    registrar() {
      setTimeout(() => {
        this.fade = !this.fade;
      }, 100);
      this.registro = !this.registro;
      this.clear();
    },
  },
  setup() {
    const user = ref("");
    const password = ref("");
    const email = ref("");
    const passwordConfirm = ref("");
    const errorMessage = ref("");
    const typeError = ref(0);

    const router = useRouter();

    const login = function () {
      store
        .dispatch(LOGIN, {
          email: email.value,
          password: password.value,
        })
        .then((res) => {
          const token = res.data.token;
          const name = res.data.name;
          const userId = res.data.id;
          localStorage.setItem("token", token);
          localStorage.setItem("name", name);
          localStorage.setItem("userId", userId);
          router.push("/");
        })
        .catch((err) => {
          errorMessage.value = err.response.data.error;
          typeError.value = err.response.data.type;
        });
    };

    const cadastro = function () {
      store
        .dispatch(CADASTRO, {
          name: user.value,
          email: email.value,
          password: password.value,
          confirmPassword: passwordConfirm.value,
        })
        .then(() => {
          login();
        })
        .catch((err) => {
          errorMessage.value = err.response.data.msg;
          typeError.value = err.response.data.type;
        });
    };

    const clear = function () {
      user.value = "";
      password.value = "";
      email.value = "";
      passwordConfirm.value = "";
      typeError.value = 0;
    };

    return {
      user,
      password,
      email,
      passwordConfirm,
      login,
      cadastro,
      errorMessage,
      typeError,
      clear,
    };
  },
});
</script>

<style scoped>
main * {
  box-sizing: border-box;
}

.main-login {
  width: 100vw;
  height: 100vh;
  background: #171616;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Inter;
}

.left-login {
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.left-login > h1 {
  color: #ffffff;
  font-size: 3vw;
  font-weight: 600;
}

.login-image {
  width: 35vw;
}

.right-login {
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-login > h1 {
  color: #ffffff;
  font-weight: 800;
  font-size: 30pt;
  margin: 0;
}

.card-login > h2 {
  color: #ffffff;
  font-size: 11pt;
  margin: 0;
  transition: color 0.3s;
}
.card-login > h2:hover {
  color: rgb(57, 102, 249);
  cursor: pointer;
}

.card-login {
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px 35px;
  background: #2d2d2d;
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

.textfield > input {
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

.btn-login {
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

.error-message {
  color: #ff0000;
}

.error-border {
  border: 1px solid #ff0000 !important;
  border-radius: 5px;
}

.fade-out {
  opacity: 0;
  transition: opacity 0.5s;
}

.fade-in {
  opacity: 1;
  transition: opacity 0.5s;
}

@media only screen and (max-width: 950px) {
  .card-login {
    width: 85%;
    display: flex;
  }

  .main-login {
    height: 100vh;
  }
}

@media only screen and (max-height: 700px) {
  .main-login {
    height: 180vh;
  }
}

@media only screen and (max-width: 600px) {
  .main-login {
    flex-direction: column;
  }

  .left-login > h1 {
    display: none;
  }

  .main-login {
    height: 150vh;
  }

  .left-login {
    width: 100%;
    height: auto;
  }

  .right-login {
    width: 100%;
    height: auto;
  }

  .login-image {
    width: 30vh;
  }
}

@media only screen and (min-width: 2000px) {
  .login-image {
    width: 70vh;
  }

  .left-login > h1 {
    font-size: 2vw;
    font-weight: 600;
  }
}
</style>
