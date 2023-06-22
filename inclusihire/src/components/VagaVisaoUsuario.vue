<template>
  <div class="job-view">
    <v-card outlined class="pa-5">
      <h2>{{ nome }}</h2>
      <p>{{ descricao }}</p>
      <p>Requisitos: {{ requisitos }}</p>
      <p>Status: {{ status }}</p>
      <p>Local: {{ local }}</p>

      <div class="footer">
        <v-btn color="info" @click="candidatar(id)" dark>Candidatar-se</v-btn>
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
    candidatar(id) {
      const config = { "headers": { "authorization": localStorage.token }, "body": {usuario: localStorage.userId, vaga: id} };
      axios.post('http://localhost:8080/usuario/candidatar', {usuario: localStorage.userId, vaga: id}, config)
        .then(response => {
          if(response.data.ok){
            if(response.data.result.user){
              alert("Você já se candidatou a essa vaga")
            } else{
              alert("Candidatou-se com sucesso!")
            }
          }
        })
        .catch(error => {
          this.$notify({
            group: 'foo',
            title: 'Erro interno',
            text: '',
            type: 'error'
          });
          this.$router.push("/login");
        });
    },
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
  