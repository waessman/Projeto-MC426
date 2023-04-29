<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn :ripple="false" text @click="home()">
        <h2>InclusiHire</h2>
      </v-btn>
      <v-spacer></v-spacer>

      <div v-if="!logado">
        <v-btn text :ripple="false" @click="cadastro()">
          <v-icon class="mr-2">mdi-list-box-outline</v-icon>
          <span class="mr-2">Cadastre-se</span>
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
    <notifications group="foo" />
  </v-app>
</template>

<script>

import router from './router';

export default {
  name: 'App',

  data: () => ({
    //
    logado: false,
  }),
  methods: {
    verificaLogin() {

      //TODO
      //Fazer método para verificar sessão no local storage 
      this.logado = true
    },
    login() {
      this.$router.push("/login")
    },
    home() {
      this.$router.push("/")
    },
    cadastro() {
      this.$router.push("/cadastro")
    },
    sair(){
      this.logado = false
    },
  },
  mounted() {
    document.title = "InclusiHire"
    this.verificaLogin()
  }
};

</script>
