<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Bem vindo ao InclusiHire
        </h1>

        <p class="subheading font-weight-regular">
          Nosso aplicativo inclusivo é dedicado a promover oportunidades para todos. Conectamos empresas que valorizam a diversidade e inclusão com talentos únicos, especialmente pessoas com deficiência (PCDs). Aqui, você encontrará vagas e processos seletivos personalizados, criando um ambiente inclusivo para construir carreiras brilhantes. Juntos, estamos construindo um futuro mais igualitário e capacitando talentos diversos a brilhar.
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Usuários
        </h2>

        <v-row justify="center">
          <p class="subheading font-weight-regular">
            Explore vagas de empresas comprometidas com a diversidade e a inclusão.
          </p>
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Empresas
        </h2>

        <v-row justify="center">
          <p class="subheading font-weight-regular">
            Nossa plataforma é o lugar ideal para empresas comprometidas com a diversidade encontrarem talentos únicos e promoverem a inclusão em seu local de trabalho. Ao se cadastrar em nosso aplicativo, as empresas podem criar perfis e publicar vagas direcionadas a minorias, com foco especial em pessoas com deficiência (PCDs).
          </p>
        </v-row>
      </v-col>

      
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

   
  }
</script>
