// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 */
router.get('/', async (req, res) => {
  res.json([{ id: 1, nome: 'Alex' }, { id: 2, nome: 'Maria' }]);
});

module.exports = router;
