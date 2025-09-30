const bcrypt = require('bcryptjs');
const User = require('../models/User');

const register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verifica se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ mensagem: 'Usuário já cadastrado.' });
    }

    // Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Cria novo usuário
    const newUser = new User({ nome, email, senha: senhaHash });
    await newUser.save();

    res.status(201).json({ mensagem: 'Usuário registrado com sucesso.' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao registrar usuário.', erro: error.message });
  }
};

const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ mensagem: 'Usuário não encontrado.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) {
      return res.status(400).json({ mensagem: 'Senha incorreta.' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, nome: user.nome },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      mensagem: 'Login realizado com sucesso!',
      token,
      usuario: {
        id: user._id,
        nome: user.nome,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro no login.', erro: error.message });
  }
};

module.exports = {
  register,
  login
};

