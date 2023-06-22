<template>
    <v-container class="mt-4">
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card>
                    <v-card-title class="headline text-center custom-card-title">Cadastro de nova empresa</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="submitForm">
                            <v-text-field label="Nome da empresa" v-model="formData.nome" outlined required></v-text-field>
                            <v-text-field label="CNPJ" v-mask="'##.###.###/####-##'" v-model="formData.documento" outlined
                                required></v-text-field>
                            <v-text-field label="E-mail" v-model="formData.email" type="email" outlined
                                required></v-text-field>
                            <v-text-field label="Senha" v-model="formData.senha" type="password" outlined
                                required></v-text-field>
                            <v-text-field label="Confirmar senha" v-model="formData.confirmarSenha" type="password" outlined
                                required></v-text-field>
                            <!-- <v-alert v-if="hasError" type="error">
                                {{ errorMessage }}
                            </v-alert> -->
                            <v-btn type="submit" color="primary" block>Cadastrar</v-btn>
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
            hasError: false,
            formData: {
                errorMessage: '',
                nome: '',
                documento: '',
                email: '',
                senha: '',
                confirmarSenha: ''
            },
        }
    },
    methods: {
        submitForm() {
            this.hasError = false
            this.errorMessage = ''

            // implementar a lógica de envio do formulário aqui
            if (this.validarCampos()) {
                axios.post('http://localhost:8080/empresa/cadastro', this.formData)
                    .then((response) => {
                        if (response && response.data.ok) {
                            this.$notify({
                                group: 'foo',
                                title: "Sucesso",
                                text: "Conta criada com sucesso",
                                type: 'info'
                            });
                            this.$router.push("/login")
                        } else {
                            this.$notify({
                                group: 'foo',
                                title: "Sucesso",
                                text: response.data.err_msg,
                                type: 'error'
                            });
                        }
                    })
                    .catch((error) => {
                        this.$notify({
                            group: 'foo',
                            title: error.name,
                            text: error.message,
                            type: 'error'
                        });
                        console.log(error);
                    });
                // enviar dados
            }
        },
        validarCampos() {
            if (!this.formData.nome || !this.formData.documento || !this.formData.email || !this.formData.senha || !this.formData.confirmarSenha) {
                this.$notify({
                    group: 'foo',
                    title: 'Dados inconsistentes',
                    text: 'Todos os campos são obrigatórios.',
                    type: 'error'
                });
                return false;
            } else if (this.formData.senha !== this.formData.confirmarSenha) {
                this.$notify({
                    group: 'foo',
                    title: 'Dados inconsistentes',
                    text: 'As senhas não coincidem.',
                    type: 'error'
                });
                return false;
            } else {
                return true;
            }
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