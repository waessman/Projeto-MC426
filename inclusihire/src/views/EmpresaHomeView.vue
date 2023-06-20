<template>
    <div>
      <router-link to="/AdicionarProcesso">Adicionar Vaga</router-link>
      <h1>Vagas</h1>
      <ul v-if="processos.length > 0">
        <li v-for="processo in processos" :key="processo._id">
          <h2>- {{ processo.nome }}</h2>
          <p>Status: {{ processo.status }}</p>
        </li>
      </ul>
      <p v-else>Nada por aqui ainda...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'empresaHome',
    data() {
      return {
        processos: [],
        tipo: null
      };
    },
    mounted() {
      const config = { "headers": { "authorization": localStorage.token} };
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
  
  