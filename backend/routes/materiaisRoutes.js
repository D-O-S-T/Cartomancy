const express = require('express');
const router = express.Router();
const { listarMateriais } = require('../controllers/materiaisController');

/**
 * @swagger
 * /materiais:
 *   get:
 *     summary: Retorna os materiais filtrados por trilha_id
 *     parameters:
 *       - in: query
 *         name: trilha_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da trilha para filtrar os materiais
 *     responses:
 *       200:
 *         description: Lista de materiais filtrada pela trilha
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   tipo:
 *                     type: string
 *                   titulo:
 *                     type: string
 *                   trilha_id:
 *                     type: integer
 *       400:
 *         description: Parâmetro trilha_id ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 */

router.get('/', listarMateriais);

module.exports = router;
