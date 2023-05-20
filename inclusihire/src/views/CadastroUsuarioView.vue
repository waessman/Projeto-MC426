<template>
    <div class="">
        <h1>Pagina de cadastro de usuario, importar aqui os componentes, seguir padrão da home</h1>
        <h2>Exemplo: {{ message }}</h2>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      message: '',
    };
  },
  mounted() {
    axios.get('http://localhost:4000/example')
      .then(response => {
        this.message = response.data.msg;
      })
      .catch(error => {
        console.error(error);
      });
  },
};
</script>