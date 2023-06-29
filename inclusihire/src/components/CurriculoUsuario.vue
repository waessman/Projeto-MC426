<template>
    <div class="job-view">
      <v-card outlined class="pa-5">
        <h2>{{ nome }}</h2>
        <p>Link currículo: <router-link :to="{path: '//'+ curriculo}" class="nav-link" target="_blank">{{ curriculo }}</router-link></p>
      </v-card>
    </div>
  </template>
    
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      id: String,
      nome: String,
      curriculo: String,
    },
    methods: {
    }
  };
  </script>
    
  <style scoped>
  .job-view {
    padding: 10px;
    /* border-bottom: 1px solid #ccc; */
  }
  
  .footer {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
  
  .v-btn {
    margin-right: 10px;
  }
  </style>
    