const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rota para editar apenas o tipo do usuário
router.put('/:id/tipo', usuarioController.editarTipoUsuario);

router.post('/login', usuarioController.login);
router.post('/cadastrar', usuarioController.cadastrarUsuario);
router.get('/', usuarioController.listarUsuarios);


/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Operações relacionadas aos usuários
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   email:
 *                     type: string
 *                   tipo_usuario:
 *                     type: string
 */

/**
 * @swagger
 * /api/usuarios/cadastrar:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
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
 *               - tipo_usuario
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               tipo_usuario:
 *                 type: string
 *                 description: "Tipo do usuário (ex: 'admin', 'estudante')"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 tipo_usuario:
 *                   type: string
 *       400:
 *         description: Falta de campos obrigatórios
 *       409:
 *         description: Email já cadastrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/usuarios/{id}/tipo:
 *   put:
 *     summary: Atualiza apenas o tipo do usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo_usuario
 *             properties:
 *               tipo_usuario:
 *                 type: string
 *                 description: "Novo tipo do usuário (ex: 'admin', 'estudante')"
 *     responses:
 *       200:
 *         description: Tipo de usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 tipo_usuario:
 *                   type: string
 *       400:
 *         description: Campos inválidos ou ausentes
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Exclui um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

module.exports = router;
