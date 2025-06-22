const express = require('express');
const router = express.Router();
const anotacaoController = require('../controllers/anotacaoController');

/**
 * @swagger
 * tags:
 *   name: Anotações
 *   description: Criação e edição de anotações de conteúdo
 */

/**
 * @swagger
 * /api/anotacoes:
 *   get:
 *     summary: Lista todas as anotações com seus respectivos materiais referenciados
 *     tags: [Anotações]
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
 *                   conteudo:
 *                     type: string
 *                     example: "Anotação sobre o material"
 *                   criado_em:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-06-21T10:00:00.000Z"
 *                   atualizado_em:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-06-21T11:00:00.000Z"
 *                   usuario_id:
 *                     type: integer
 *                     example: 2
 *                   trilha_id:
 *                     type: integer
 *                     example: 3
 *                   referencia:
 *                     type: object
 *                     nullable: true
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 10
 *                       tipo_material:
 *                         type: string
 *                         example: "cartas"
 *                       material_id:
 *                         type: integer
 *                         example: 7
 *                       material:
 *                         type: object
 *                         nullable: true
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 7
 *                           titulo:
 *                             type: string
 *                             example: "Carta de boas-vindas"
 *                           autor:
 *                             type: string
 *                             example: "Ana"
 *                           desc:
 *                             type: string
 *                             example: "Significado simbólico da carta..."
 */
router.get('/', anotacaoController.listarAnotacao);

/**
 * @swagger
 * /api/anotacoes:
 *   post:
 *     summary: Cria uma nova anotação
 *     tags: [Anotações]
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
 *     tags: [Anotações]
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
 *     tags: [Anotações]
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
