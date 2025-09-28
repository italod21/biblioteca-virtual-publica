# 📚 Biblioteca Virtual Pública

Projeto de uma biblioteca virtual pública com conteúdo compartilhado e colaborativo.  
Usuários podem cadastrar, buscar e consultar livros livremente, com controle de acesso aos próprios conteúdos.

---

## 🚀 Tecnologias utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- Swagger UI (documentação da API)
- Dotenv (variáveis de ambiente)
- Nodemon (desenvolvimento)
- Bcrypt.js (criptografia de senha)
- JSON Web Token (em breve)
- Nodemailer (em breve)

---

## 📦 Instalação e execução local

### 1. Clone o repositório

```
git clone https://github.com/italod21/biblioteca-virtual-publica.git
cd biblioteca-virtual-publica
```

### 2. Instale as dependências

```
npm install
```

### 3. Crie o arquivo `.env` dentro da pasta `backend/`

Exemplo de `.env`:

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/biblioteca
JWT_SECRET=sua_chave_secreta
EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=sua_senha_app
```

### 4. Inicie o servidor em modo desenvolvimento

```
npm run dev
```
## 🧪 Testando a API com Swagger

Após iniciar o servidor, acesse no navegador:

👉 [`http://localhost:4000/api-docs`](http://localhost:4000/api-docs)

Você verá a interface interativa da documentação da API via Swagger UI.

## ✅ Status atual

- [x] Configuração do servidor Express
- [x] Conexão com MongoDB
- [x] Configuração do Swagger
- [x] Rota de teste documentada
- [ ] Cadastro de usuários (`/auth/register`)
- [ ] Login e autenticação JWT
- [ ] CRUD de livros
- [ ] Ranking de livros mais acessados
- [ ] Confirmação de e-mail

## 📁 Estrutura de diretórios

```
backend/
├── src/
│   ├── config/          # Configurações (Swagger, DB, etc)
│   ├── controllers/     # Lógica das rotas
│   ├── models/          # Modelos do MongoDB
│   ├── routes/          # Arquivos de rotas
│   └── index.js         # Arquivo principal do servidor
├── .env
├── .gitignore
└── package.json
```
## 📄 Licença

Este projeto está sob a licença MIT.
