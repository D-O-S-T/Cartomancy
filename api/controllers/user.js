import { db } from "../db.js";

// GET - Buscar usuários
export const getUsers = async (_, res) => {
  try {
    const result = await db.query("SELECT * FROM usuarios");
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error("Erro no getUsers:", err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

// POST - Adicionar usuário
export const addUser = async (req, res) => {
  const query = `
    INSERT INTO usuarios (nome, email, fone, data_nascimento)
    VALUES ($1, $2, $3, $4)
  `;
  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nascimento,
  ];

  try {
    await db.query(query, values);
    return res.status(200).json("Usuário criado com sucesso.");
  } catch (err) {
    console.error("Erro no addUser:", err);
    return res.status(500).json({ error: "Erro ao criar usuário." });
  }
};

// PUT - Atualizar usuário
export const updateUser = async (req, res) => {
  const query = `
    UPDATE usuarios
    SET nome = $1, email = $2, fone = $3, data_nascimento = $4
    WHERE id = $5
  `;
  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nascimento,
    req.params.id,
  ];

  try {
    await db.query(query, values);
    return res.status(200).json("Usuário atualizado com sucesso.");
  } catch (err) {
    console.error("Erro no updateUser:", err);
    return res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
};

// DELETE - Deletar usuário
export const deleteUser = async (req, res) => {
  const query = "DELETE FROM usuarios WHERE id = $1";

  try {
    await db.query(query, [req.params.id]);
    return res.status(200).json("Usuário deletado com sucesso.");
  } catch (err) {
    console.error("Erro no deleteUser:", err);
    return res.status(500).json({ error: "Erro ao deletar usuário." });
  }
};
