# **Diagrama C3 - Nivel 3 (Componentes)**
<img src = "docs/atividade4.1_3.png">

# **Principais componentes da Aplicação**

- **Login Controller:**  Permite aos usuários acessarem o site

- **Cadastro Controller:** Permite ao usuário criar novos usuários do tipo usuário e empresa

- **Usuários Controller:** Permite ao usuário ver e editar informações de cadastro

- **Processos Controller:** Permite ao usuário criar, atualizar, remover, pesquisar por processo de vagas de empregos e informações sobre como candidatos a vaga (usuário tipo empresa) Permite também pesquisar vagas de empregos, se candidatar a uma vaga (usuário tipo pessoa física).

- **Login Model:** Oferece funcionalidades para o fluxo de login, validando na base de dados as informações de tentativa de login

- **Cadastro Model:** Oferece funcionalidades para o fluxo de cadastro, validando e inserindo novos usuários na base de dados.

- **Usuários Model:** Oferece funcionalidades para o fluxo de edição de informações do usuário, atualizando e buscando na base de dados as informações do usuário atual.

- **Processos Model:** Oferece funcionalidades para o fluxo de visualização de processos, criando, removendo, atualizando e buscando informações sobre os processos em aberto na base de dados.

# **Estilos Arquiteturais Utilizados**

- **Rest API baseado em HTTP para backend**
A partir de métodos HTTP é possível manipular recursos da aplicação, por exemplo: podemos fazer uma requisição de POST /usuario/cadastro ou /empresa/cadastro para inserir novos usuários ou empresas

- **MVC (Model- View - Controller)**
Na aplicação web, as interfaces do O Vue.js utilizam desse estilo para gerar interfaces gráficas no browser do usuário.
