<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn :ripple="false" text @click="landing()">
        <h2>InclusiHire</h2>
      </v-btn>
      <v-spacer></v-spacer>

      <div v-if="!logado">
        <v-btn text :ripple="false" @click="cadastro('usuario')">
          <v-icon class="mr-2">mdi-list-box-outline</v-icon>
          <span class="mr-2">Cadastro (Usuario)</span>
        </v-btn>
        <v-btn text :ripple="false" @click="cadastro('empresa')">
          <v-icon class="mr-2">mdi-list-box-outline</v-icon>
          <span class="mr-2">Cadastro (Empresa)</span>
        </v-btn>
        <v-btn :ripple="false" text @click="login()">
          <v-icon class="mr-2">mdi-account</v-icon>
          <span class="mr-2">Login</span>
        </v-btn>
      </div>
      <div v-else>
        <v-btn :ripple="false" text @click="minhasVagas()">
          <v-icon>mdi-list-box-outline</v-icon>
          <span class="mr-2">Criar nova vaga</span>
        </v-btn>
        <v-btn :ripple="false" text @click="sair()">
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
    minhasVagas(){
      this.$router.push('/adicionarProcesso')
    },
    verificaLogin() {
      var token = localStorage.token;
      if (token) {
          this.logado = true;
          this.tipoLogado = localStorage.tipo

          if (this.tipoLogado == 2){
            this.$router.push("/usuarioHome")}
          else if (this.tipoLogado == 1) {
            this.$router.push("/empresaHome")
          }

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
