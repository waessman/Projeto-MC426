<template>
  <div class="pa-4">
    <!-- <router-link to="/AdicionarProcesso">Adicionar Vaga</router-link> -->
    <h1>Minhas Vagas</h1>
    <div v-if="processos.length > 0">
      <div v-for="processo in processos" :key="processo._id">
        <VagaVisaoEmpresa :nome="processo.nome" :requisitos="processo.requisitos" :status="processo.status"
          :local="processo.local"
          :id="processo._id"
          :descricao="processo.descricao"
          :numeroCandidaturas="processo.candidaturas ? processo.candidaturas : 0">

        </VagaVisaoEmpresa>
        <!-- <li v-for="processo in processos" :key="processo._id">
          <h2>- {{ processo.nome }}</h2>
          <p>Status: {{ processo.status }}</p>
        </li> -->
        <v-spacer></v-spacer>
      </div>
    </div>
    <p v-else>Nada por aqui ainda...</p>
  </div>
</template>
  
<script>
import axios from 'axios';
import VagaVisaoEmpresa from '../components/VagaVisaoEmpresa.vue';

export default {
  components: {
    VagaVisaoEmpresa
  },
  name: 'empresaHome',
  data() {
    return {
      processos: [],
      tipo: null
    };
  },
  mounted() {
    const config = { "headers": { "authorization": localStorage.token } };
    axios.get('http://localhost:8080/empresa/processos', config)
      .then(response => {
        this.processos = response.data.processos;
        this.tipo = response.data.tipo;
      })
      .catch(error => {
        this.$notify({
          group: 'foo',
          title: 'Erro de autentificação',
          text: 'Faça Login',
          type: 'error'
        });
        this.$router.push("/login");
      });
  }
};
</script>
  
<style>
ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}
</style>
  
  