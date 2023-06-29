<template>
  <v-container class="mt-4">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline text-center custom-card-title">Edição meu perfil</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitForm">
              <v-text-field label="Nome Completo" tittle="Nome Completo" v-model="formData.nome" outlined required tabindex="6"></v-text-field>
              <v-text-field label="CPF" tittle="CPF" v-mask="'###.###.###-##'" v-model="formData.documento" outlined
                required tabindex="7"></v-text-field>
              <v-text-field label="Link currículo" tittle="Link currículo" v-model="formData.curriculo" outlined required tabindex="8"></v-text-field>

              <!-- <v-alert v-if="hasError" type="error">
                              {{ errorMessage }}
                          </v-alert> -->
              <v-btn type="submit" color="primary" block title="Salvar Alterações" tabindex="9">Salvar alterações</v-btn>
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
  mounted() {
    this.id = localStorage.userId
    this.userToken = localStorage.token
    this.carregaForm()
  },
  data() {
    return {
      id: '',
      userToken: '',
      hasError: false,
      formData: {
        errorMessage: '',
        nome: '',
        documento: '',
        curriculo: '',
      },
    }
  },
  methods: {
    submitForm() {
      this.hasError = false
      this.errorMessage = ''

      // implementar a lógica de envio do formulário aqui
      if (this.validarCampos()) {
        const configs = { "headers": { "authorization": localStorage.token }, "body":  this.formData }
        axios.post('http://localhost:8080/usuarios/edit', this.formData, configs)
          .then((response) => {
            if (response && response.data.ok) {
              this.$notify({
                group: 'foo',
                title: "Sucesso",
                text: "Conta editada com sucesso",
                type: 'info'
              });
            } else {
              this.$notify({
                group: 'foo',
                title: "Erro ao editar",
                text: response.data.err_msg,
                type: 'error'
              });
            }
          })
          .catch((error) => {
            this.$notify({
              group: 'foo',
              title: error.name,
              text: error.response ? error.response.data.error : error.message,
              type: 'error'
            });
            console.log(error);
          });
        // enviar dados
      }
    },
    validarCampos() {
      if (!this.formData.nome || !this.formData.documento) {
        this.$notify({
          group: 'foo',
          title: 'Dados inconsistentes',
          text: 'Nome e documento são obrigatórios',
          type: 'error'
        });
        return false;
      } else {
        return true;
      }
    },
    carregaForm() {
      const configs = { "headers": { "authorization": localStorage.token }, "body": { "id": this.id } }
      axios.post('http://localhost:8080/usuarios/get', configs, configs)
        .then((response) => {
          if (response && response.data.ok) {
            this.formData = response.data.result[0]
          } else {
            this.$notify({
              group: 'foo',
              title: "Erro interno",
              text: response.data.err_msg,
              type: 'error'
            });
          }
        })
    },
    Voltar() {
      this.$router.push("/usuarioHome");
    }
  }
}
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
  margin-right: 15px;
  margin-left: 15px;
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