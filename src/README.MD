# Sistema de Chamados com Categorias

Este é um sistema de gerenciamento de chamados, onde os usuários podem criar, listar, atualizar e excluir chamados, organizados por categorias. O projeto foi desenvolvido com React no frontend, Node.js + Express no backend e Sequelize para integração com o banco de dados.

---

## Tecnologias Utilizadas

- Frontend React.js, React Router, Axios  
- Backend Node.js, Express.js, Sequelize ORM  
- Banco de Dados MySQL ou PostgreSQL (configurável no Sequelize)  
- Autenticação JWT (JSON Web Token)  
- Documentação da API Swagger  

---

## Funcionalidades

### Usuário

- Login e Logout
- Visualizar chamados abertos e fechados
- Criar novos chamados em categorias específicas
- Editar e excluir chamados

### Administrador

- Gerenciar categorias (criar, editar, excluir)
- Visualizar chamados de todas as categorias

### Chamados

- Filtragem por categoria
- Filtragem por status Aberto ou Fechado
- Interface amigável para criação e edição de chamados

---

## Estrutura do Projeto

backend
controllers
ChamadoController.js
UsuarioController.js
middlewares
TokenValido.js
models
Categoria.js
Chamado.js
Usuario.js
conexao.js
routes
chamadoRoutes.js
categoriaRoutes.js
usuarioRoutes.js
app.js
server.js

frontend
src
components
Chamados.jsx
Categorias.jsx
Login.jsx
services
api.js
App.jsx
index.jsx

yaml
Copiar código

---

## Instalação

### Backend

1. Clone o repositório
```bash
git clone URL_DO_SEU_REPOSITORIO
Acesse a pasta backend

bash
Copiar código
cd backend
Instale as dependências

bash
Copiar código
npm install
Configure o arquivo .env

ini
Copiar código
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
JWT_SECRET=sua_chave_secreta
Rode as migrations e seeders (se necessário)

bash
Copiar código
npx sequelize-cli dbmigrate
npx sequelize-cli dbseedall
Inicie o servidor

bash
Copiar código
npm run dev
Frontend
Acesse a pasta frontend

bash
Copiar código
cd frontend
Instale as dependências

bash
Copiar código
npm install
Inicie a aplicação

bash
Copiar código
npm start
A aplicação estará disponível em httplocalhost3001 (ou a porta configurada).

Rotas da API
Chamados
GET chamados - Lista todos os chamados

GET id_categoriachamados - Lista chamados de uma categoria

POST id_categoriachamados - Cria um novo chamado em uma categoria

PUT id_categoriachamadosid_chamado - Atualiza um chamado

DELETE id_categoriachamadosid_chamado - Exclui um chamado

Categorias
GET categorias - Lista todas as categorias

POST categorias - Cria uma categoria

PUT categoriasid - Atualiza uma categoria

DELETE categoriasid - Exclui uma categoria

Usuários
POST login - Autenticação de usuário

Observações
Apenas usuários com token válido podem acessar as rotas protegidas.

O sistema diferencia usuários comuns e administradores, permitindo que apenas administradores gerenciem categorias.

Chamados são filtrados automaticamente por categoria e status (Aberto ou Fechado).

