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
        <v-btn :ripple="false" text @click="sair()">
          <v-icon class="mr-2">mdi-logout</v-icon>
          <span class="mr-2">Sair</span>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

import router from './router';
import localStorage from 'localstorage'

export default {
  name: 'App',

  data: () => ({
    //
    logado: false,
    tipoLogado: 0,
  }),
  methods: {
    loadLocalStorageToken() {
      const data = localStorage.token;
      return data ? JSON.parse(data) : null;
    },
    verificaLogin() {
      var token = this.loadLocalStorageToken()

      console.log(token)

      if (token != null && token.expirationDate != null) {

        var tokenDate = new Date(token.expirationDate)
        var now = new Date();

        if (now <= tokenDate) {

          this.logado = true
          let tipoLogado = token.userType

          if (tipoLogado == 1)
            this.$router.push("/usuarioHome")
          else if (tipoLogado == 2) {
            this.$router.push("/empresaHome")
          }

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
      this.landing()
    },
  },
  mounted() {
    document.title = "InclusiHire"
    this.verificaLogin()
  }
};

</script>
