const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const {
  criarLivro,
  buscarLivros,
  atualizarLivro,
  deletarLivro
} = require('../controllers/livroController');

/**
 * @swagger
 * /livros:
 *   post:
 *     summary: Cadastrar novo livro
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - autor
 *               - genero
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               genero:
 *                 type: string
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *       401:
 *         description: Token ausente ou inválido
 */
router.post('/livros', verifyToken, criarLivro);

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Buscar livros por filtros (titulo, autor, genero)
 *     tags: [Livros]
 *     parameters:
 *       - in: query
 *         name: titulo
 *         schema:
 *           type: string
 *         description: Parte do título do livro
 *       - in: query
 *         name: autor
 *         schema:
 *           type: string
 *         description: Parte do nome do autor
 *       - in: query
 *         name: genero
 *         schema:
 *           type: string
 *         description: Parte do gênero
 *     responses:
 *       200:
 *         description: Lista de livros encontrados
 */
router.get('/livros', buscarLivros);

/**
 * @swagger
 * /livros/{id}:
 *   put:
 *     summary: Atualizar livro (somente autor)
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               genero:
 *                 type: string
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *       403:
 *         description: Sem permissão
 *       404:
 *         description: Livro não encontrado
 */
router.put('/livros/:id', verifyToken, atualizarLivro);

/**
 * @swagger
 * /livros/{id}:
 *   delete:
 *     summary: Deletar livro (somente autor)
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Livro deletado com sucesso
 *       403:
 *         description: Sem permissão
 *       404:
 *         description: Livro não encontrado
 */
router.delete('/livros/:id', verifyToken, deletarLivro);

module.exports = router;
