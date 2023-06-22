<template>
  <div class="job-view">
    <v-card outlined class="pa-5">
      <h2>{{ nome }}</h2>
      <p>{{ descricao }}</p>
      <p>Requisitos: {{ requisitos }}</p>
      <p>Status: {{ status }}</p>
      <p>Número de Candidaturas: {{ numeroCandidaturas }}</p>
      <p>Local: {{ local }}</p>

      <div class="footer">
        <v-btn color="grey darken-1" @click="verCandidaturas" dark>Ver Candidatos</v-btn>
        <v-btn v-if="status != 'Encerrado'" color="primary" @click="editarVaga(id)">Editar</v-btn>
        <v-btn v-else disabled color="primary" @click="editarVaga(id)">Editar</v-btn>
        <v-btn color="error" v-if="status!='Encerrado'" @click="fecharVaga(id)">Fechar</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    id: String,
    nome: String,
    requisitos: String,
    status: String,
    numeroCandidaturas: Number,
    local: String,
    descricao: String,
  },
  methods: {
    verCandidaturas(id){
      this.$router.push("/verCandidatos/"+id)
    },  
    editarVaga(id) {
      // Lógica para editar a vaga
      this.$router.push('/adicionarProcesso/'+id)
    },
    fecharVaga(id) {
      const configs = { "headers": { "authorization": localStorage.token }, "body": { "id": id} }
      axios.post('http://localhost:8080/empresa/close_processo', {id: id}, configs)
        .then((response) => {
          if (response && response.data.ok) {
            console.log(response)
            this.status = response.data.processo.status
          } else {
            this.$notify({
              group: 'foo',
              title: "Erro interno",
              text: response.data.err_msg,
              type: 'error'
            });
          }
        })
    }
  }
};
</script>

<style scoped>
.job-view {
  padding: 10px;
  /* border-bottom: 1px solid #ccc; */
}

.footer {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.v-btn {
  margin-right: 10px;
}
</style>
