const Usuario = require('../models/Usuario');

const login = async (req, res) => {
  try {
    const { email, senha_hash } = req.body;

    if (!email || !senha_hash) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
    }

    const usuario = await Usuario.findOne({
      where: { email, senha_hash },
      attributes: ['id', 'nome', 'email', 'tipo_usuario']
    });

    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    res.json({ mensagem: 'Login realizado com sucesso.', usuario });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ['id', 'nome', 'email', 'tipo_usuario'],
    });
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ erro: 'Erro ao listar usuários.' });
  }
};

const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, tipo_usuario } = req.body;

    if (!nome || !email || !senha || !tipo_usuario) {
      return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(409).json({ erro: 'Email já cadastrado.' });
    }

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha_hash: senha,
      tipo_usuario
    });

    res.status(201).json({
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      tipo_usuario: novoUsuario.tipo_usuario
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
  }
};

const editarTipoUsuario = async (req, res) => {
  const { id } = req.params;
  const { tipo_usuario } = req.body;

  if (!tipo_usuario) {
    return res.status(400).json({ erro: 'O campo tipo_usuario é obrigatório.' });
  }

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    usuario.tipo_usuario = tipo_usuario;
    await usuario.save();

    res.json({
      mensagem: 'Tipo de usuário atualizado com sucesso.',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo_usuario: usuario.tipo_usuario,
      }
    });
  } catch (err) {
    console.error('Erro ao atualizar tipo de usuário:', err);
    res.status(500).json({ erro: 'Erro ao atualizar usuário.' });
  }
};


module.exports = {
  cadastrarUsuario,
  login,
  listarUsuarios,
  editarTipoUsuario,
};

