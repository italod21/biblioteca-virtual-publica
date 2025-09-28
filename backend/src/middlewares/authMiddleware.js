const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Esperado: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensagem: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Armazena os dados do usuário autenticado na requisição
    next(); // Libera o acesso à rota
  } catch (error) {
    res.status(403).json({ mensagem: 'Token inválido.' });
  }
};

module.exports = verifyToken;
