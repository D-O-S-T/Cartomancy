const express = require('express');
const router = express.Router();
const trilhaController = require('../controllers/trilhaController');

router.get('/', trilhaController.listarTrilha);
router.post('/', trilhaController.cadastrarTrilha);
router.put('/:id', trilhaController.atualizarTrilha);
router.delete('/:id', trilhaController.excluirTrilha);

/**
 * @swagger
 * tags:
 *   name: Trilhas
 *   description: Gerenciamento de Trilhas
 */

/**
 * @swagger
 * /api/trilhas:
 *   get:
 *     summary: Lista todas as trilhas
 *     tags: [Trilhas]
 *     responses:
 *       200:
 *         description: Lista de trilhas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: Trilha Introdutória
 */
router.get('/', trilhaController.listarTrilha);

/**
 * @swagger
 * /api/trilhas:
 *   post:
 *     summary: Cadastra uma nova trilha
 *     tags: [Trilhas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Trilha Avançada
 *     responses:
 *       201:
 *         description: Trilha criada com sucesso
 */
router.post('/', trilhaController.cadastrarTrilha);

/**
 * @swagger
 * /api/trilhas/{id}:
 *   put:
 *     summary: Atualiza o nome de uma trilha
 *     tags: [Trilhas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da trilha a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Tarô Atualizado
 *     responses:
 *       200:
 *         description: Trilha atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 nome:
 *                   type: string
 *                   example: Tarô Atualizado
 *       404:
 *         description: Trilha não encontrada
 */

router.put('/:id', trilhaController.atualizarTrilha);

/**
 * @swagger
 * /api/trilhas/{id}:
 *   delete:
 *     summary: Remove uma trilha do sistema
 *     tags: [Trilhas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trilha removida com sucesso
 *       404:
 *         description: Trilha não encontrada
 */
router.delete('/:id', trilhaController.excluirTrilha);

module.exports = router;
