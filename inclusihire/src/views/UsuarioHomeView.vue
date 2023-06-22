<template>
  <div class="pa-4">
    <!-- <router-link to="/AdicionarProcesso">Adicionar Vaga</router-link> -->
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card-title>
            <h2 class="text-center">Vagas</h2>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row align="center" justify="center">
                <v-col cols="12" sm="6">
                  <v-text-field clearable v-model="termoBusca" label="Buscar vaga" outlined dense></v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-btn @click="buscar" class="mb-7" color="primary" dark>
                    <v-icon left>mdi-magnify</v-icon>
                    Buscar
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
    <div v-if="processos.length > 0">
      <div v-for="processo in processos" :key="processo._id">
        <VagaVisaoUsuario :nome="processo.nome" :requisitos="processo.requisitos" :status="processo.status"
          :local="processo.local" :id="processo._id" :descricao="processo.descricao"
          :numeroCandidaturas="processo.candidaturas ? processo.candidaturas : 0">

        </VagaVisaoUsuario>
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
import VagaVisaoUsuario from '../components/VagaVisaoUsuario.vue';

export default {
  components: {
    VagaVisaoUsuario
  },
  name: 'empresaHome',
  data() {
    return {
      processos: [],
      tipo: null,
      termoBusca: '',
    };
  },
  methods: {
    buscar() {
      const config = { "headers": { "authorization": localStorage.token }, "body": { filtro: this.termoBusca } };
      axios.post('http://localhost:8080/usuario/get_processo', config, config)
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
  },
  mounted() {
    this.buscar();
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
