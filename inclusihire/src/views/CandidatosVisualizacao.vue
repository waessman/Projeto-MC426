<template>
    <div class="pa-4">
      <!-- <router-link to="/AdicionarProcesso">Adicionar Vaga</router-link> -->
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card-title>
              <h2 class="text-center">Candidatos</h2>
            </v-card-title>

          </v-col>
        </v-row>
      </v-container>
      <div v-if="candidatos.length > 0">
        <div v-for="candidato in candidatos" :key="candidato._id">
          <CurriculoUsuario :nome="candidato.nome" :curriculo="candidato.curriculo">
          </CurriculoUsuario>
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
  import CurriculoUsuario from '../components/CurriculoUsuario.vue';
  
  export default {
    components: {
      CurriculoUsuario
    },
    name: 'empresaHome',
    data() {
      return {
        candidatos: [],
        tipo: null,
        termoBusca: '',
      };
    },
    mounted() {
      this.vaga = this.$route.params.id
      const config = { "headers": { "authorization": localStorage.token }, "body": { vaga: this.vaga } };
        axios.post('http://localhost:8080/empresa/getCandidaturas', {vaga: this.vaga}, config).then((response) => {
          if (response.data.ok)
            this.candidatos = response.data.result;
          else {
            this.$notify({
              group: 'foo',
              title: response.data.result,
              text: '',
              type: 'error'
            });
          }
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
  
  .d-flex {
    display: flex;
  }
  
  .align-center {
    align-items: center;
  }
  
  
  .search-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
  </style>  
  