const express = require('express');
const router = express.Router();
const anotacaoController = require('../controllers/anotacaoController');

router.get('/', anotacaoController.listarAnotacao);
router.post('/', anotacaoController.criarAnotacao);
router.put('/:id', anotacaoController.editarAnotacao);
router.delete('/:id', anotacaoController.excluirAnotacao);

/**
 * @swagger
 * tags:
 *   name: Anotacoes
 *   description: Gerenciamento de Anotações
 */

/**
 * @swagger
 * /api/anotacoes:
 *   get:
 *     summary: Lista todas as anotações
 *     tags: [Anotacoes]
 *     responses:
 *       200:
 *         description: Lista de anotações retornada com sucesso
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
 *                   titulo:
 *                     type: string
 *                     example: "Minha primeira anotação"
 *                   descricao:
 *                     type: string
 *                     example: "Conteúdo da anotação"
 *                   criado_em:
 *                     type: string
 *                     format: date-time
 *                   atualizado_em:
 *                     type: string
 *                     format: date-time
 */
router.get('/', anotacaoController.listarAnotacao);

/**
 * @swagger
 * /api/anotacoes:
 *   post:
 *     summary: Cria uma nova anotação
 *     tags: [Anotacoes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Nova anotação"
 *               descricao:
 *                 type: string
 *                 example: "Conteúdo da nova anotação"
 *     responses:
 *       201:
 *         description: Anotação criada com sucesso
 */
router.post('/', anotacaoController.criarAnotacao);

/**
 * @swagger
 * /api/anotacoes/{id}:
 *   put:
 *     summary: Atualiza apenas o conteúdo da anotação
 *     tags: [Anotacoes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da anotação a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *                 example: "Novo conteúdo da anotação"
 *     responses:
 *       200:
 *         description: Anotação atualizada com sucesso
 *       404:
 *         description: Anotação não encontrada
 *       500:
 *         description: Erro ao atualizar anotação
 */
router.put('/:id', anotacaoController.editarAnotacao);

/**
 * @swagger
 * /api/anotacoes/{id}:
 *   delete:
 *     summary: Exclui uma anotação
 *     tags: [Anotacoes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da anotação a ser excluída
 *     responses:
 *       200:
 *         description: Anotação excluída com sucesso
 */
router.delete('/:id', anotacaoController.excluirAnotacao);

module.exports = router;
