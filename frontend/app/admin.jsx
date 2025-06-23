import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert, Picker } from 'react-native';

const BASE_URL_TRILHAS = 'http://localhost:5000/api/trilhas';
const BASE_URL_VIDEOS = 'http://localhost:5000/api/videos';

export default function Admin() {
  // States trilhas
  const [nomeTrilha, setNomeTrilha] = useState('');
  const [trilhas, setTrilhas] = useState([]);
  const [editIdTrilha, setEditIdTrilha] = useState('');
  const [editNomeTrilha, setEditNomeTrilha] = useState('');
  const [deleteIdTrilha, setDeleteIdTrilha] = useState('');

  // States vídeos
  const [tituloVideo, setTituloVideo] = useState('');
  const [descVideo, setDescVideo] = useState('');
  const [urlVideo, setUrlVideo] = useState('');
  const [trilhaVideo, setTrilhaVideo] = useState('');
  const [deleteIdVideo, setDeleteIdVideo] = useState('');

  const [resposta, setResposta] = useState('');

  useEffect(() => {
    carregarTrilhas();
  }, []);

  const carregarTrilhas = async () => {
    try {
      const res = await fetch(BASE_URL_TRILHAS);
      const data = await res.json();
      setTrilhas(data);
    } catch (err) {
      setResposta('Erro ao carregar trilhas: ' + err.message);
    }
  };

  // --------------------- Funções CRUD --------------------- //
    // Criar Trilha
    const criarTrilha = async () => {
    if (!nomeTrilha.trim()) {
        Alert.alert('Informe o nome da trilha.');
        return;
    }

    try {
        const res = await fetch(BASE_URL_TRILHAS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nomeTrilha })
        });
        const json = await res.json();
        setResposta(JSON.stringify(json, null, 2));
        setNomeTrilha('');
        carregarTrilhas();
    } catch (err) {
        setResposta('Erro ao criar trilha: ' + err.message);
    }
    };

    // Editar Trilha
    const editarTrilha = async () => {
    if (!editIdTrilha.trim() || !editNomeTrilha.trim()) {
        Alert.alert('Informe ID e novo nome da trilha.');
        return;
    }

    try {
        const res = await fetch(`${BASE_URL_TRILHAS}/${editIdTrilha}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: editNomeTrilha })
        });
        const json = await res.json();
        setResposta('Trilha editada:\n' + JSON.stringify(json, null, 2));
        setEditIdTrilha('');
        setEditNomeTrilha('');
        carregarTrilhas();
    } catch (err) {
        setResposta('Erro ao editar trilha: ' + err.message);
    }
    };

    // Excluir Trilha
    const excluirTrilha = async () => {
    if (!deleteIdTrilha.trim()) {
        Alert.alert('Informe o ID da trilha para excluir.');
        return;
    }

    try {
        const res = await fetch(`${BASE_URL_TRILHAS}/${deleteIdTrilha}`, { method: 'DELETE' });
        const json = await res.json();
        setResposta('Trilha excluída:\n' + JSON.stringify(json, null, 2));
        setDeleteIdTrilha('');
        carregarTrilhas();
    } catch (err) {
        setResposta('Erro ao excluir trilha: ' + err.message);
    }
    };

    // Listar Trilhas
    const listarTrilhas = async () => {
    try {
        const res = await fetch(BASE_URL_TRILHAS);
        const trilhas = await res.json();
        if (trilhas.length === 0) {
        setResposta('Nenhuma trilha cadastrada.');
        return;
        }
        let texto = '';
        trilhas.forEach(t => {
        texto += `ID: ${t.id}\nNome: ${t.nome}\n\n`;
        });
        setResposta(texto);
    } catch (err) {
        setResposta('Erro ao listar trilhas: ' + err.message);
    }
    };

    // Criar Video
    const criarVideo = async () => {
    if (!tituloVideo.trim() || !urlVideo.trim() || !trilhaVideo) {
        Alert.alert('Preencha título, URL e selecione a trilha.');
        return;
    }

    const dados = {
        titulo: tituloVideo,
        desc: descVideo,
        url: urlVideo,
        trilha_id: Number(trilhaVideo)
    };

    try {
        const res = await fetch(BASE_URL_VIDEOS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
        });
        const json = await res.json();
        setResposta('Vídeo criado:\n' + JSON.stringify(json, null, 2));
        setTituloVideo('');
        setDescVideo('');
        setUrlVideo('');
        setTrilhaVideo('');
    } catch (err) {
        setResposta('Erro ao criar vídeo: ' + err.message);
    }
    };

    // Excluir Video
    const excluirVideo = async () => {
    if (!deleteIdVideo.trim()) {
        Alert.alert('Informe o ID do vídeo para excluir.');
        return;
    }

    try {
        const res = await fetch(`${BASE_URL_VIDEOS}/${deleteIdVideo}`, { method: 'DELETE' });
        const json = await res.json();
        setResposta('Vídeo excluído:\n' + JSON.stringify(json, null, 2));
        setDeleteIdVideo('');
    } catch (err) {
        setResposta('Erro ao excluir vídeo: ' + err.message);
    }
    };

    // Listar Videos
    const listarVideos = async () => {
    try {
        const res = await fetch(BASE_URL_VIDEOS);
        const videos = await res.json();
        if (videos.length === 0) {
        setResposta('Nenhum vídeo cadastrado.');
        return;
        }
        let texto = '';
        videos.forEach(v => {
        texto += `ID: ${v.id}\nTítulo: ${v.titulo}\nDescrição: ${v.desc || '(sem descrição)'}\nURL: ${v.url}\nTrilha ID: ${v.trilha_id}\n\n`;
        });
        setResposta(texto);
    } catch (err) {
        setResposta('Erro ao listar vídeos: ' + err.message);
    }
    };
    //---------------------------------------------------------//
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Painel Admin</Text>

      <Text style={styles.sectionTitle}>Adicionar Trilha</Text>
      <TextInput placeholder="Nome da trilha" value={nomeTrilha} onChangeText={setNomeTrilha} style={styles.input} />
      <Button title="Criar Trilha" onPress={criarTrilha} />

      {/* Adicione os blocos de edição, exclusão e listagem aqui da mesma forma */}

      <Text style={styles.sectionTitle}>Adicionar Vídeo</Text>
      <Picker selectedValue={trilhaVideo} onValueChange={setTrilhaVideo} style={styles.input}>
        <Picker.Item label="Selecione uma trilha" value="" />
        {trilhas.map((t) => (
          <Picker.Item key={t.id} label={t.nome} value={t.id} />
        ))}
      </Picker>
      <TextInput placeholder="Título" value={tituloVideo} onChangeText={setTituloVideo} style={styles.input} />
      <TextInput placeholder="Descrição" value={descVideo} onChangeText={setDescVideo} style={styles.input} />
      <TextInput placeholder="URL" value={urlVideo} onChangeText={setUrlVideo} style={styles.input} />
      <Button title="Criar Vídeo" onPress={criarVideo} />

      <Text style={styles.sectionTitle}>Resposta / Resultado</Text>
      <Text style={styles.pre}>{resposta}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  sectionTitle: { fontSize: 20, marginTop: 30, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 },
  pre: { padding: 10, backgroundColor: '#eee', marginTop: 10, fontFamily: 'monospace' },
});
