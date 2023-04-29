<template>
  <v-container class="mt-4">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline text-center custom-card-title">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="username"
                label="Nome do usuário"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Senha"
                outlined
                type="password"
              ></v-text-field>
              <v-btn type="submit" color="primary">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      // implementar lógica de login!
      // por enquando só imprime o usuário e senha no console
      console.log("Usuário:", this.username, "Senha:", this.password);
      this.username = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
/* estilos para o formulário */
.v-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.v-text-field {
  width: 100%;
  margin-bottom: 20px;
}

.v-btn {
  margin-top: 20px;
}

/* estilos para o contêiner */
.v-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.custom-card-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  padding: 16px;
  border-radius: 8px;
}

/* estilos para dispositivos móveis */
@media (max-width: 600px) {
  .v-card {
    width: 90%;
    max-width: 400px;
  }
}
</style>
