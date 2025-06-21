import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/anotacoes';
const MATERIAIS_URL = 'http://localhost:5000/materiais';
const USUARIOS_URL = 'http://localhost:5000/api/usuarios';
const TRILHAS_URL = 'http://localhost:5000/api/trilhas';

async function carregarMateriais(trilha_id) {
  if (!trilha_id) return;

  try {
    const res = await fetch(`${MATERIAIS_URL}?trilha_id=${trilha_id}`);
    if (!res.ok) throw new Error('Erro na resposta do servidor');
    const materiais = await res.json();

    const select = document.getElementById('materialSelecionado');
    select.disabled = false;
    select.innerHTML = '<option value="">Selecione um material</option>';

    materiais.forEach(mat => {
      if (!mat.tipo || !mat.id) return;
      const tipoUpper = mat.tipo.toUpperCase();
      select.innerHTML += `<option value="${mat.tipo}|${mat.id}">[${tipoUpper}] ${mat.titulo || 'Sem título'}</option>`;
    });

  } catch (err) {
    alert('Erro ao carregar materiais: ' + err.message);
  }
}

function usuarioSelecionado() {
  const trilhaSelect = document.getElementById('trilha_id');
  trilhaSelect.disabled = false;
}

function trilhaSelecionada() {
  const trilha_id = document.getElementById('trilha_id').value;
  carregarMateriais(trilha_id);
}

async function criarAnotacao() {
  const usuarioId = document.getElementById('usuario').value;
  const trilhaId = document.getElementById('trilha').value;
  const conteudo = document.getElementById('conteudo').value.trim();
  const materialSelecionado = document.getElementById('material').value;

  if (!usuarioId || !trilhaId || !conteudo) {
    alert('Preencha usuário, trilha e conteúdo.');
    return;
  }

  const dados = {
    usuario_id: Number(usuarioId),
    trilha_id: Number(trilhaId),
    conteudo
  };

  if (materialSelecionado) {
    const [tipo_material, material_id] = materialSelecionado.split('|');
    dados.tipo= tipo_material;
    dados.id_original= Number(material_id);
  }

  try {
    const res = await fetch('http://localhost:5000/api/anotacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Erro ao criar anotação');
    }

    const data = await res.json();
    alert('Anotação criada com sucesso!');
    // Limpar campos ou atualizar interface
  } catch (err) {
    alert('Erro: ' + err.message);
  }
}

function listarAnotacoes() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(data => mostrar(data))
    .catch(err => mostrarErro(err));
}


function mostrarErro(err) {
  const pre = document.getElementById('resposta');
  pre.textContent = 'Erro: ' + err.message;
}
