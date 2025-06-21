const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/login', usuarioController.login);
router.post('/cadastrar', usuarioController.cadastrarUsuario);

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
 */
router.get('/', usuarioController.listarUsuarios);

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
 * /api/usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
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
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 */
//router.put('/:id', usuarioController.atualizarUsuario);

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
 */
//router.delete('/:id', usuarioController.excluirUsuario);

module.exports = router;
