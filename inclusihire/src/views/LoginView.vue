<template>
  <v-container class="mt-4">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline text-center custom-card-title">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="credentials.email"
                label="E-mail do usuário"
                title="E-mail do usuário"
                outlined
                tabindex="5"
              ></v-text-field>
              <v-text-field
                v-model="credentials.senha"
                label="Senha"
                title="Senha"
                outlined
                tabindex="6"
                type="password"
              ></v-text-field>
              <v-btn type="submit" color="primary" tabindex="7">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      credentials: {
        email: "",
        senha: ""
      }
    };
  },
  methods: {
    login() {
      // logica do login
      if (this.validarCampos()) {
                axios.post('http://localhost:8080/login', this.credentials)
                    .then((response) => {
                        if (response && response.data.ok) {
                            this.$notify({
                                group: 'foo',
                                title: "Sucesso",
                                text: "Login efetuado com sucesso",
                                type: 'info'
                            });
                            localStorage.setItem('token', response.data.token);
                            localStorage.setItem('tipoLogado', response.data.user.tipo)
                            localStorage.setItem('userId', response.data.user._id)
                            this.logado = true;
                            this.tipoLogado = response.data.user.tipo;
                            if (response.data.user.tipo == 1){
                              this.$router.push("/empresaHome");
                            }
                            else{
                              this.$router.push("/usuarioHome");
                            }
                        }
                        else{
                          if(! response.data.ok){
                            this.$notify({
                            group: 'foo',
                            title: "Erro",
                            text: response.data.err_msg,
                            type: 'error'
                        });
                          }
                        }
                    })
                    .catch((error) => {
                        this.$notify({
                            group: 'foo',
                            title: "Erro",
                            text: "Não foi possível efetuar o login",
                            type: 'error'
                        });
                        console.log(error);
                    });
            }
    },
    validarCampos(){
      if (!this.credentials.email || !this.credentials.senha){
        this.$notify({
          group: 'foo',
          title: "Preencha todos os campos",
          text: "Todos os campos são obrigatórios",
          type: 'error'
        })
        return false;
      }
      return true;
    }
  },
};
</script>

<style scoped>
/* estilos para o formulário */
.v-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.v-text-field {
  width: 100%;
  margin-bottom: 20px;
}

.v-btn {
  margin-top: 20px;
}

/* estilos para o contêiner */
.v-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.custom-card-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  padding: 16px;
  border-radius: 8px;
}

/* estilos para dispositivos móveis */
@media (max-width: 600px) {
  .v-card {
    width: 90%;
    max-width: 400px;
  }
}
</style>
