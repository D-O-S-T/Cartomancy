// backend/controllers/userController.js
const User = require('../models/User');

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await User.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ erro: 'Erro ao buscar usuários.' });
  }
};

const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha_hash, tipo_usuario } = req.body;
    const novoUsuario = await User.create({ nome, email, senha_hash, tipo_usuario });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ erro: 'Erro ao criar usuário.' });
  }
};

const atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha_hash, tipo_usuario } = req.body;
    const usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    await usuario.update({ nome, email, senha_hash, tipo_usuario });
    res.json(usuario);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ erro: 'Erro ao atualizar usuário.' });
  }
};

const excluirUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    await usuario.destroy();
    res.json({ mensagem: 'Usuário excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ erro: 'Erro ao excluir usuário.' });
  }
};

module.exports = {
  listarUsuarios,
  criarUsuario,
  atualizarUsuario,
  excluirUsuario,
};
