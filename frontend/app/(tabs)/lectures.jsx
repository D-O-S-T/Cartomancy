import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useRouter } from "expo-router";
import DeckPicker from "../components/deckPicker";

const { width, height } = Dimensions.get("window");

export default function Lectures() {
  const [selectedDeck, setSelectedDeck] = useState("rider");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#8E2DE2", "#C13584"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Introdução */}
        <Text style={styles.welcomeTitle}>Bem-vindo ao Tarot App</Text>
        <Text style={styles.introText}>
          O Tarot é um antigo oráculo composto por 78 cartas, dividido em Arcanos Maiores e Menores.
          Cada carta carrega um significado simbólico e espiritual, capaz de guiar e aconselhar quem
          busca respostas ou autoconhecimento.
        </Text>

        {/* Vídeo de Introdução (placeholder estilizado) */}
        <View style={styles.videoPlaceholder}>
          <Text style={styles.videoText}>🎥 Vídeo de Introdução ao Tarot</Text>
        </View>

        {/* Escolha de Baralho */}
        <Text style={styles.title}>
          Para iniciar a sua jornada, escolha o baralho:
        </Text>

        <DeckPicker
          selectedDeck={selectedDeck}
          onSelectDeck={setSelectedDeck}
        />

        {/* Botões */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/majorArcanas")}
        >
          <Text style={styles.buttonText}>Arcanos Maiores</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/minorArcanas")}
        >
          <Text style={styles.buttonText}>Arcanos Menores</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  introText: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  videoPlaceholder: {
    width: "100%",
    maxWidth: 320,
    height: 180,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  videoText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 60,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});