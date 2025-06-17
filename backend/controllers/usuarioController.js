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




module.exports = {
  login,
  listarUsuarios,
};
