import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function AnotacoesScreen() {
  const [anotacoes, setAnotacoes] = useState([]);
  const [modalLeituraVisible, setModalLeituraVisible] = useState(false);
  const [notaSelecionada, setNotaSelecionada] = useState(null);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [conteudoNota, setConteudoNota] = useState("");

  const carregarAnotacoes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/anotacoes");
      const data = await response.json();
      setAnotacoes(data);
    } catch (error) {
      console.error("Erro ao buscar anotações:", error);
    }
  };

  useEffect(() => {
    carregarAnotacoes();
  }, []);

  const abrirNota = (nota) => {
    setNotaSelecionada(nota);
    setModalLeituraVisible(true);
  };

  const salvarNota = async () => {
    if (!conteudoNota.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/anotacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conteudo: conteudoNota,
          usuario_id: 1, // você pode adaptar depois
          trilha_id: 1,
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      await carregarAnotacoes();
      setConteudoNota("");
      setModalAddVisible(false);
    } catch (error) {
      console.error("Erro ao salvar anotação:", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => abrirNota(item)}>
      <Text style={styles.cardText}>Anotação #{item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#8E2DE2", "#C13584"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Suas Anotações</Text>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => carregarAnotacoes()}
          >
            <Feather name="refresh-cw" size={22} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalAddVisible(true)}
          >
            <Feather name="plus" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={anotacoes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={
          <Text style={{ color: "#fff", textAlign: "center", marginTop: 30 }}>
            Nenhuma anotação encontrada.
          </Text>
        }
      />

      {/* Modal de leitura */}
      <Modal
        visible={modalLeituraVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalLeituraVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Anotação #{notaSelecionada?.id}
              </Text>

              <Text style={styles.modalTexto}>
                {notaSelecionada?.conteudo || "Sem conteúdo disponível."}
              </Text>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => setModalLeituraVisible(false)}
              >
                <Text style={styles.saveButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Modal adicionar anotação */}
      <Modal
        visible={modalAddVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalAddVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Adicionar Nota</Text>

              <TextInput
                placeholder="Conteúdo da nota"
                placeholderTextColor="#ccc"
                style={styles.textArea}
                value={conteudoNota}
                onChangeText={setConteudoNota}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />

              <TouchableOpacity style={styles.saveButton} onPress={salvarNota}>
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalAddVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#2c003e",
    borderRadius: 15,
    padding: 20,
    width: "90%",
    maxWidth: 430,
    alignSelf: "center",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTexto: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 25,
    textAlign: "left",
  },
  saveButton: {
    backgroundColor: "#8E2DE2",
    borderRadius: 15,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 15,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  textArea: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
    fontSize: 16,
    minHeight: 120,
  },
  cancelButton: {
    paddingVertical: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#ccc",
    fontSize: 14,
  },
});
