<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn :ripple="false" text @click="landing()" tabindex="1" tittle="InclusiHire">
        <h2>InclusiHire</h2>
      </v-btn>
      <v-spacer></v-spacer>

      <div v-if="!logado">
        <v-btn text :ripple="false" @click="cadastro('usuario')" tabindex="2" tittle="Cadastro de usuários">
          <v-icon class="mr-2">mdi-list-box-outline</v-icon>
          <span class="mr-2">Cadastro (Usuario)</span>
        </v-btn>
        <v-btn text :ripple="false" @click="cadastro('empresa')" tabindex="3" tittle="Cadastro de Empresas">
          <v-icon class="mr-2">mdi-list-box-outline</v-icon>
          <span class="mr-2">Cadastro (Empresa)</span>
        </v-btn>
        <v-btn :ripple="false" text @click="login()" tabindex="4">
          <v-icon class="mr-2">mdi-account</v-icon>
          <span class="mr-2">Login</span>
        </v-btn>
      </div>
      <div v-else>
        <v-btn v-if="tipoLogado == 1" :ripple="false" text @click="verMinhasVagas()" tabindex="2" tittle="Minhas Vagas">
          <v-icon>mdi-list-box-outline</v-icon>
          <span class="mr-2">Minhas vagas</span>
        </v-btn>
        <v-btn v-if="tipoLogado == 1" :ripple="false" text @click="addVaga()" tabindex="3" tittle="Nova Vaga">
          <v-icon>mdi-list-box-outline</v-icon>
          <span class="mr-2">Criar nova vaga</span>
        </v-btn>
        <v-btn v-if="tipoLogado == 2" :ripple="false" text @click="verCurriculo()" tabindex="2" tittle="Perfil">
          <v-icon>mdi-list-box-outline</v-icon>
          <span class="mr-2">Editar meu perfil</span>
        </v-btn>
        <v-btn v-if="tipoLogado == 2" :ripple="false" text @click="verTodasVagas()" tabindex="3" tittle="Vagas abertas">
          <v-icon>mdi-list-box-outline</v-icon>
          <span class="mr-2">Ver vagas abertas</span>
        </v-btn>
        <v-btn v-if="tipoLogado == 2" :ripple="false" text @click="verCandidaturas()" tabindex="5" tittle="Minhas candidaturas">
          <v-icon>mdi-list-box-outline</v-icon>
          <span class="mr-2">Ver minhas candidaturas</span>
        </v-btn>
        <v-btn :ripple="false" text @click="sair()" tabindex="4" tittle="Sair">
          <v-icon class="mr-2">mdi-logout</v-icon>
          <span class="mr-2">Sair</span>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <notifications group="foo" />
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
  return {
    logado: false,
    tipoLogado: 0,
  }},

  methods: {
    verCurriculo(){
      this.$router.push('/usuarioCurriculo')
    },
    verTodasVagas(){
      this.$router.push('/usuarioHome')
    },
    verCandidaturas(){
      this.$router.push('/minhasCandidaturas')
    },
    verMinhasVagas(){
      this.$router.push('/empresaHome')
    },
    addVaga(){
      this.$router.push('/adicionarProcesso')
    },
    verificaLogin() {
      var token = localStorage.token;
      if (token) {
          this.logado = true;
          this.tipoLogado = localStorage.tipoLogado

        }
    },
    login() {
      this.$router.push("/login")
    },
    landing() {
      this.$router.push("/")
    },
    cadastro(tipo) {
      this.$router.push("/cadastro/" + tipo)
    },
    sair() {
      this.logado = false
      localStorage.setItem('token', '')
      this.landing()
    },
  },
  mounted() {
    document.title = "InclusiHire"
    this.verificaLogin()
  },

  watch: {
    '$route': function(){
      this.verificaLogin()
    }
  },
};

</script>
