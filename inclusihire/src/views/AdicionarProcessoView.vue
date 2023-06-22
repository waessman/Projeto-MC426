<template>
    <v-container class="mt-4">
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card>
                    <v-card-title class="headline text-center custom-card-title">Nova Vaga</v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field label="Título da Vaga" v-model="formData.nome" outlined required></v-text-field>
                            <v-textarea label="Descrição"  v-model="formData.descricao" outlined
                                required></v-textarea>
                            <v-text-field label="Link externo" v-model="formData.link"></v-text-field>
                            <v-text-field label="Local" v-model="formData.local" outlined required></v-text-field>
                            <v-textarea label="Requisitos"  v-model="formData.requisitos" outlined
                                required></v-textarea>
                            <div>
                                <v-btn @click.native="submitForm" color="primary">Salvar</v-btn>
                                <v-btn @click.native="Voltar" color="primary">Cancelar</v-btn>
                            </div>
                            
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
                descricao: '',
                link: '',
                local: '',
                requisitos: ''
            },
        }
    },
    methods: {
        submitForm() {
            this.hasError = false
            this.errorMessage = ''

            if (this.validarCampos()) {
                const headers= { "authorization": localStorage.token};
                axios.post('http://localhost:8080/empresa/novo_processo',this.formData, { headers: headers })
                    .then((response) => {
                        if (response && response.data.ok) {
                            this.$notify({
                                group: 'foo',
                                title: "Sucesso",
                                text: "Vaga criada com sucesso",
                                type: 'info'
                            });
                            this.$router.push("/empresaHome");
                        }else{
                            this.$notify({
                                group: 'foo',
                                title: "blabla",
                                text: response.data.ok,
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
            if (!this.formData.nome || !this.formData.descricao || !this.formData.local || !this.formData.requisitos) {
                this.$notify({
                    group: 'foo',
                    title: 'Dados inconsistentes',
                    text: 'Todos os campos (exceto link) são obrigatórios.',
                    type: 'error'
                });
                return false;
            }else {
                return true;
            }
        },
        Voltar() {
            this.$router.push("/empresaHome");
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