const express = require('express');
const router = express.Router();
const importarCartas = require('../scripts/importarCartas');
const cartaController = require('../controllers/cartaController'); 
const { listarCartas, editarCarta } = require('../controllers/cartaController');


/**
 * @swagger
 * tags:
 *   name: Cartas
 *   description: Operações relacionadas às cartas
 */

/**
 * @swagger
 * /cartas:
 *   get:
 *     summary: Lista todas as cartas
 *     tags: [Cartas]
 *     responses:
 *       200:
 *         description: Lista de cartas
 */
router.get('/', cartaController.listarCartas);

/**
 * @swagger
 * /cartas/{id}:
 *   put:
 *     summary: Edita uma carta existente
 *     tags: [Cartas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da carta
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               name: O Mago
 *               meaning_up: Habilidade, autoconfiança
 *               meaning_rev: Manipulação, ilusão
 *     responses:
 *       200:
 *         description: Carta atualizada
 *       404:
 *         description: Carta não encontrada
 */
router.put('/:id', cartaController.editarCarta);

// Rota nova para importar cartas da API externa
router.post('/importar', async (req, res) => {
  try {
    await importarCartas();
    res.status(200).json({ mensagem: 'Cartas importadas com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao importar cartas' });
  }
});

module.exports = router;
