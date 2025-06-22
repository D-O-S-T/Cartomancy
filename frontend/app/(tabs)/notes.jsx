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
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const anotacoesMock = [
  { id: "1", titulo: "Anotação sobre Tarot #1" },
  { id: "2", titulo: "Anotação sobre Tarot #2" },
  { id: "3", titulo: "Anotação sobre Tarot #3" },
];

export default function AnotacoesScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tituloNota, setTituloNota] = useState("");
  const [conteudoNota, setConteudoNota] = useState("");

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => {}}>
      <Text style={styles.cardText}>{item.titulo}</Text>
    </TouchableOpacity>
  );

  const salvarNota = () => {
    console.log("Salvar nota:", tituloNota, conteudoNota);
    setTituloNota("");
    setConteudoNota("");
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#8E2DE2", "#C13584"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Topo */}
      <View style={styles.header}>
        <Text style={styles.title}>Suas Anotações</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Feather name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={anotacoesMock}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
      />

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Adicionar Nota</Text>

              <TextInput
                placeholder="Título da nota"
                placeholderTextColor="#ccc"
                style={styles.input}
                value={tituloNota}
                onChangeText={setTituloNota}
              />

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
                onPress={() => setModalVisible(false)}
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
    maxHeight: "70%",
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
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 15,
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
  cancelButton: {
    paddingVertical: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#ccc",
    fontSize: 14,
  },
});
