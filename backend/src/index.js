const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const authRoutes = require('./routes/auth');
const livrosRoutes = require('./routes/livros');

// Carrega o arquivo .env de forma absoluta
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Verifica se o Mongo_URI foi carregado corretamente
console.log('MONGO_URI lido do .env:', process.env.MONGO_URI);

// Inicializa o app Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', authRoutes);
app.use(livrosRoutes);
// Rota básica de teste
app.get('/', (req, res) => {
  res.send('🚀 API da Biblioteca Virtual Pública está no ar!');
});

// Conecta ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conectado ao MongoDB');

  // Inicia o servidor após a conexão com o banco
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🔊 Servidor rodando em http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ Erro ao conectar no MongoDB:', err.message);
});