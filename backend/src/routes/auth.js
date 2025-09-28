const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cadastro de novo usuário
 *     description: Registra um novo usuário com nome, email e senha.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Usuário já cadastrado
 *       500:
 *         description: Erro ao registrar usuário
 */
router.post('/auth/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     description: Autentica um usuário e retorna um token JWT.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Usuário não encontrado ou senha incorreta
 *       500:
 *         description: Erro no login
 */
router.post('/auth/login', login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Retorna dados do usuário autenticado
 *     description: Rota protegida que retorna os dados contidos no token JWT.
 *     tags:
 *       - Autenticação
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 *       401:
 *         description: Token ausente
 *       403:
 *         description: Token inválido
 */
router.get('/auth/me', verifyToken, (req, res) => {
  res.status(200).json({
    mensagem: 'Usuário autenticado!',
    user: req.user,
  });
});

/**
 * @swagger
 * /auth/atualizar-senha:
 *   put:
 *     summary: Atualizar a senha do usuário
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senhaAtual
 *               - novaSenha
 *             properties:
 *               senhaAtual:
 *                 type: string
 *               novaSenha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *       400:
 *         description: Senha atual incorreta
 *       500:
 *         description: Erro ao atualizar senha
 */
router.put('/auth/atualizar-senha', verifyToken, async (req, res) => {
  try {
    const { senhaAtual, novaSenha } = req.body;
    const usuario = await User.findById(req.user.id);

    const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);

    if (!senhaValida) {
      return res.status(400).json({ mensagem: 'Senha atual incorreta' });
    }

    const novaSenhaCriptografada = await bcrypt.hash(novaSenha, 10);
    usuario.senha = novaSenhaCriptografada;
    await usuario.save();

    res.status(200).json({ mensagem: 'Senha atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar senha', erro: error.message });
  }
});

module.exports = router;