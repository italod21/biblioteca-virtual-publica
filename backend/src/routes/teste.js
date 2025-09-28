const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /teste:
 *   get:
 *     summary: Rota de teste da API
 *     description: Retorna uma mensagem simples para testar o Swagger.
 *     responses:
 *       200:
 *         description: Rota funcionando corretamente
 */
router.get('/teste', (req, res) => {
  res.json({ mensagem: 'Swagger funcionando!' });
});

module.exports = router;