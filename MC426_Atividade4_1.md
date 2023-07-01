# **Diagrama C3 - Nivel 3 (Componentes)**
<img src = "docs/atividade4.1_3.png">

# **Principais componentes da Aplicação**

- **Login Controller:**  Permite que usuários e empresas acessem o site e iniciem uma sessão.

- **Cadastro Controller:** Permite que novos usuários e empresas criem contas no site.

- **Usuários Controller:** Permite ao usuário ver e editar informações de cadastro.

- **Processos Controller:** Permite a criação, atualização, remoção e busca por processos de vagas de empregos e informações sobre como candidatos a vaga (usuário tipo empresa) Permite também pesquisar vagas de empregos, se candidatar a uma vaga (usuário tipo pessoa física).

- **Login Model:** Oferece funcionalidades de autenticação para o fluxo de login, validando na base de dados as informações de tentativa de login e, caso bem sucedida, fornecendo um token que valida a sessão.

- **Cadastro Model:** Oferece funcionalidades para o fluxo de cadastro, validando os campos inseridos e adicionando novos usuários ou novas empresas na base de dados.

- **Usuários Model:** Oferece funcionalidades para o fluxo de edição de informações do usuário, atualizando e buscando na base de dados as informações do usuário atual.

- **Processos Model:** Oferece funcionalidades para o fluxo de visualização de processos, criando, removendo, atualizando e buscando informações sobre os processos em aberto na base de dados, como a listagem de candidatos que se candidataram à vaga, e seus respectivos currículos. Também possibilita que empresas consultem informações a respeito de seus próprios processos já encerrados, assim como encerrar processos que estejam em aberto.

# **Estilos Arquiteturais Utilizados**

- **Rest API baseado em HTTP para backend**
A partir de métodos HTTP é possível manipular recursos da aplicação, por exemplo: podemos fazer uma requisição de POST /usuario/cadastro ou /empresa/cadastro para inserir novos usuários ou empresas.

- **MVC (Model- View - Controller)**
Em nosso projeto, utilizamos o estilo de arquitetura MVC para fazer a elencagem do backend com o frontend. As models e controllers foram criadas em node.js, sendo responsáveis por lidar com a lógica de negócio das funcionalidades, onde as models representavam os dados e suas operações, enquanto as controllers eram responsáveis por receber as requisições do cliente. As views por outro lado, foram implementadas em Vue.js, responsáveis por construir a camada de visualização, ou seja, a interface do usuário.
Essa abordagem facilitou muito o desenvolvimento do projeto como um todo, pois permitiu uma clara separação de responsabilidades entre backend e frontend, facilitando muito também a sua manutenção.

