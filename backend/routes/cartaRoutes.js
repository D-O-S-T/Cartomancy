const express = require('express');
const router = express.Router();
const cartaController = require('../controllers/cartaController');

/**
 * @swagger
 * tags:
 *   - name: Cartas
 *     description: As cartas são carregadas a partir de duas APIs externas e não são manipuláveis diretamente. São usadas apenas para leitura e aprendizado.
 */

/**
 * @swagger
 * /cartas:
 *   get:
 *     summary: Lista todas as cartas com imagem e descrição
 *     tags:
 *       - Cartas
 *     responses:
 *       200:
 *         description: Lista de cartas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   slug:
 *                     type: string
 *                     example: the-magician
 *                   name:
 *                     type: string
 *                     example: The Magician
 *                   name_short:
 *                     type: string
 *                     example: ar01
 *                   type:
 *                     type: string
 *                     example: major
 *                   meaning_up:
 *                     type: string
 *                   meaning_rev:
 *                     type: string
 *                   desc:
 *                     type: string
 *                   img_url:
 *                     type: string
 *                     format: uri
 *                     example: https://raw.githubusercontent.com/krates98/tarotcardapi/main/images/themagician.jpeg
 */
router.get('/', cartaController.listarCartas);

/**
 * @swagger
 * /cartas/{slug}:
 *   get:
 *     summary: Retorna os dados de uma carta específica pelo slug
 *     tags:
 *       - Cartas
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: "Slug da carta (ex: the-magician)"
 *     responses:
 *       200:
 *         description: Dados da carta retornados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 slug:
 *                   type: string
 *                 name:
 *                   type: string
 *                 name_short:
 *                   type: string
 *                 type:
 *                   type: string
 *                 meaning_up:
 *                   type: string
 *                 meaning_rev:
 *                   type: string
 *                 desc:
 *                   type: string
 *                 img_url:
 *                   type: string
 *                   format: uri
 *       404:
 *         description: Carta não encontrada
 */
router.get('/:slug', cartaController.buscarCarta);

module.exports = router;
