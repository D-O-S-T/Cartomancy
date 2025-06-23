import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";

const BASE_URL_TRILHAS = "http://localhost:5000/api/trilhas";
const BASE_URL_VIDEOS = "http://localhost:5000/api/videos";

export default function Admin() {
  // Trilhas states
  const [nomeTrilha, setNomeTrilha] = useState("");
  const [trilhas, setTrilhas] = useState([]);
  const [editIdTrilha, setEditIdTrilha] = useState("");
  const [editNomeTrilha, setEditNomeTrilha] = useState("");
  const [deleteIdTrilha, setDeleteIdTrilha] = useState("");

  // Videos states
  const [tituloVideo, setTituloVideo] = useState("");
  const [descVideo, setDescVideo] = useState("");
  const [urlVideo, setUrlVideo] = useState("");
  const [trilhaVideo, setTrilhaVideo] = useState("");
  const [deleteIdVideo, setDeleteIdVideo] = useState("");

  const [resposta, setResposta] = useState("");

  useEffect(() => {
    carregarTrilhas();
  }, []);

  const carregarTrilhas = async () => {
    try {
      const res = await fetch(BASE_URL_TRILHAS);
      const data = await res.json();
      setTrilhas(data);
    } catch (err) {
      setResposta("Erro ao carregar trilhas: " + err.message);
    }
  };

  // CRUD Functions for Trilhas

  const criarTrilha = async () => {
    if (!nomeTrilha.trim()) {
      Alert.alert("Informe o nome da trilha.");
      return;
    }
    try {
      const res = await fetch(BASE_URL_TRILHAS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nomeTrilha }),
      });
      const json = await res.json();
      setResposta("Trilha criada:\n" + JSON.stringify(json, null, 2));
      setNomeTrilha("");
      carregarTrilhas();
    } catch (err) {
      setResposta("Erro ao criar trilha: " + err.message);
    }
  };

  const editarTrilha = async () => {
    if (!editIdTrilha.trim() || !editNomeTrilha.trim()) {
      Alert.alert("Informe ID e novo nome da trilha.");
      return;
    }
    try {
      const res = await fetch(`${BASE_URL_TRILHAS}/${editIdTrilha}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: editNomeTrilha }),
      });
      const json = await res.json();
      setResposta("Trilha editada:\n" + JSON.stringify(json, null, 2));
      setEditIdTrilha("");
      setEditNomeTrilha("");
      carregarTrilhas();
    } catch (err) {
      setResposta("Erro ao editar trilha: " + err.message);
    }
  };

  const excluirTrilha = async () => {
    if (!deleteIdTrilha.trim()) {
      Alert.alert("Informe o ID da trilha para excluir.");
      return;
    }
    try {
      const res = await fetch(`${BASE_URL_TRILHAS}/${deleteIdTrilha}`, {
        method: "DELETE",
      });
      const json = await res.json();
      setResposta("Trilha excluída:\n" + JSON.stringify(json, null, 2));
      setDeleteIdTrilha("");
      carregarTrilhas();
    } catch (err) {
      setResposta("Erro ao excluir trilha: " + err.message);
    }
  };

  // CRUD Functions for Videos

  const criarVideo = async () => {
    if (!tituloVideo.trim() || !urlVideo.trim() || !trilhaVideo) {
      Alert.alert("Preencha título, URL e selecione a trilha.");
      return;
    }
    const dados = {
      titulo: tituloVideo,
      desc: descVideo,
      url: urlVideo,
      trilha_id: Number(trilhaVideo),
    };
    try {
      const res = await fetch(BASE_URL_VIDEOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      const json = await res.json();
      setResposta("Vídeo criado:\n" + JSON.stringify(json, null, 2));
      setTituloVideo("");
      setDescVideo("");
      setUrlVideo("");
      setTrilhaVideo("");
    } catch (err) {
      setResposta("Erro ao criar vídeo: " + err.message);
    }
  };

  const excluirVideo = async () => {
    if (!deleteIdVideo.trim()) {
      Alert.alert("Informe o ID do vídeo para excluir.");
      return;
    }
    try {
      const res = await fetch(`${BASE_URL_VIDEOS}/${deleteIdVideo}`, {
        method: "DELETE",
      });
      const json = await res.json();
      setResposta("Vídeo excluído:\n" + JSON.stringify(json, null, 2));
      setDeleteIdVideo("");
    } catch (err) {
      setResposta("Erro ao excluir vídeo: " + err.message);
    }
  };

  // List functions (optional UI buttons)

  const listarTrilhas = async () => {
    try {
      const res = await fetch(BASE_URL_TRILHAS);
      const data = await res.json();
      if (data.length === 0) {
        setResposta("Nenhuma trilha cadastrada.");
        return;
      }
      let texto = "";
      data.forEach((t) => {
        texto += `ID: ${t.id}\nNome: ${t.nome}\n\n`;
      });
      setResposta(texto);
    } catch (err) {
      setResposta("Erro ao listar trilhas: " + err.message);
    }
  };

  const listarVideos = async () => {
    try {
      const res = await fetch(BASE_URL_VIDEOS);
      const data = await res.json();
      if (data.length === 0) {
        setResposta("Nenhum vídeo cadastrado.");
        return;
      }
      let texto = "";
      data.forEach((v) => {
        texto += `ID: ${v.id}\nTítulo: ${v.titulo}\nDescrição: ${
          v.desc || "(sem descrição)"
        }\nURL: ${v.url}\nTrilha ID: ${v.trilha_id}\n\n`;
      });
      setResposta(texto);
    } catch (err) {
      setResposta("Erro ao listar vídeos: " + err.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#8E2DE2", "#C13584"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Painel Admin</Text>

        {/* Criar Trilha */}
        <Text style={styles.sectionTitle}>Adicionar Trilha</Text>
        <TextInput
          placeholder="Nome da trilha"
          placeholderTextColor="#ccc"
          value={nomeTrilha}
          onChangeText={setNomeTrilha}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={criarTrilha}>
          <Text style={styles.buttonText}>Criar Trilha</Text>
        </TouchableOpacity>

        {/* Editar Trilha */}
        <Text style={styles.sectionTitle}>Editar Trilha</Text>
        <TextInput
          placeholder="ID da trilha"
          placeholderTextColor="#ccc"
          value={editIdTrilha}
          onChangeText={setEditIdTrilha}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Novo nome da trilha"
          placeholderTextColor="#ccc"
          value={editNomeTrilha}
          onChangeText={setEditNomeTrilha}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={editarTrilha}>
          <Text style={styles.buttonText}>Editar Trilha</Text>
        </TouchableOpacity>

        {/* Excluir Trilha */}
        <Text style={styles.sectionTitle}>Excluir Trilha</Text>
        <TextInput
          placeholder="ID da trilha"
          placeholderTextColor="#ccc"
          value={deleteIdTrilha}
          onChangeText={setDeleteIdTrilha}
          style={styles.input}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.deleteButton} onPress={excluirTrilha}>
          <Text style={styles.deleteText}>Excluir Trilha</Text>
        </TouchableOpacity>

        {/* Listar Trilhas */}
        <TouchableOpacity style={styles.button} onPress={listarTrilhas}>
          <Text style={styles.buttonText}>Listar Trilhas</Text>
        </TouchableOpacity>

        {/* Criar Video */}
        <Text style={styles.sectionTitle}>Adicionar Vídeo</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={trilhaVideo}
            onValueChange={setTrilhaVideo}
            style={styles.picker}
            dropdownIconColor="#fff"
          >
            <Picker.Item label="Selecione uma trilha" value="" />
            {trilhas.map((t) => (
              <Picker.Item key={t.id} label={t.nome} value={t.id} />
            ))}
          </Picker>
        </View>

        <TextInput
          placeholder="Título"
          placeholderTextColor="#ccc"
          value={tituloVideo}
          onChangeText={setTituloVideo}
          style={styles.input}
        />
        <TextInput
          placeholder="Descrição"
          placeholderTextColor="#ccc"
          value={descVideo}
          onChangeText={setDescVideo}
          style={styles.input}
        />
        <TextInput
          placeholder="URL"
          placeholderTextColor="#ccc"
          value={urlVideo}
          onChangeText={setUrlVideo}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={criarVideo}>
          <Text style={styles.buttonText}>Criar Vídeo</Text>
        </TouchableOpacity>

        {/* Excluir Video */}
        <Text style={styles.sectionTitle}>Excluir Vídeo</Text>
        <TextInput
          placeholder="ID do vídeo"
          placeholderTextColor="#ccc"
          value={deleteIdVideo}
          onChangeText={setDeleteIdVideo}
          style={styles.input}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.deleteButton} onPress={excluirVideo}>
          <Text style={styles.deleteText}>Excluir Vídeo</Text>
        </TouchableOpacity>

        {/* Listar Vídeos */}
        <TouchableOpacity style={styles.button} onPress={listarVideos}>
          <Text style={styles.buttonText}>Listar Vídeos</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Resposta</Text>
        <Text style={styles.responseText}>{resposta}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    paddingBottom: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#fff",
    marginTop: 24,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.07)",
    padding: 14,
    borderRadius: 20,
    color: "#fff",
    marginBottom: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 20,
    marginBottom: 10,
    overflow: "hidden",
  },
  picker: {
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.07)",
  },
  button: {
    backgroundColor: "#8E2DE2",
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: "#C13584",
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  deleteText: {
    color: "#fff",
    fontSize: 14,
  },
  responseText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "monospace",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    marginVertical: 20,
    opacity: 0.5,
  },
});
