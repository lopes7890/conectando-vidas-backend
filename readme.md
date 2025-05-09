
<h2 align="center" style="color:red;">(BACKEND TCC ETEC - Conectando Vidas)</h2>


# 🐾 API para Adoção de Animais

Esta é uma API RESTful desenvolvida em **TypeScript** com o objetivo de gerenciar um sistema de adoção de animais. Ela permite o cadastro de animais, usuários e adoções, integrando funcionalidades essenciais para um site de adoção responsável.

## 🚀 Tecnologias Utilizadas

- TypeScript
- Node.js
- Express
- Prisma 
- MySQL
- JWT (para autenticação)
- Bcrypt (para hash de senhas)
- Dotenv (variáveis de ambiente)
- Cloudinary API (gerenciamento de imagens)
## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/lopes7890/conectando-vidas-frontend.git

2. Instale as dependências:

   
   ```bash
   npm install

3. Execute as migrations/seeds

    ```bash
    npx prisma migrate dev


## 📌 Endpoints 

🔒 = Rota protegida por token JWT

### 👤 Usuário

- `POST /cadastro/usuario` – Cadastrar usuário no sistema  
- `POST /login` – Efetuar o login do usuário e gerar token JWT  
- `GET /usuario` – Buscar dados do usuário autenticado 🔒

- `PUT /atualizar/usuario` - Atualizar dados do usuário 🔒
- `DELETE /usuario` - Apagar dados do usuário 🔒


### 😺 Animais

- `POST /cadastro/animais` - Cadastrar animais no sistema 🔒
- `GET /animal/:id` - Pegar informações de um animal específico 🔒
- `PUT /animal/adotado` - Atualizar o status do animal para "adotado" 🔒
- `GET /animals` - Pegar os dados de todos os animais 
- `GET /ultimos/animais` - Pegar os dados dos útimos 5 animais registrados no sistema
- `DELETE /animal` - Apagar dados do animal 🔒

### 🤝 ONGs

- `POST /cadastro/ong` - Cadastrar ONGs parceiras
- `GET /ong` - Pegar dados de uma ONG específica 
- `DELETE /ong` - Apagar dados da ONG

### 🪂 Voluntários

- `POST /cadastro/voluntario` - Cadastrar voluntário 🔒
- `GET /voluntario/:id_voluntario` - Pegar dados de um voluntário específico 🔒
- `GET /voluntarios` - Pegar dados de todos os voluntários 🔒
- `DELETE /voluntario` - Apagar dados do voluntário 🔒
