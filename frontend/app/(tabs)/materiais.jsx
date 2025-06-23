import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import CustomModal from "../components/modal";

const { width } = Dimensions.get("window");

export default function Materiais() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#8E2DE2", "#C13584"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.pageTitle}>Conteúdo Educacional</Text>

        <Text style={styles.description}>
          Aqui você encontra vídeos e materiais para aprofundar seus conhecimentos sobre Tarot,
          suas origens e como interpretar as cartas.
        </Text>

        {/* Card PDF — abre modal */}
        <TouchableOpacity style={styles.videoItem} onPress={() => setModalVisible(true)}>
          <MaterialIcons name="picture-as-pdf" size={28} color="#fff" style={styles.icon} />
          <Text style={styles.videoLabel}>Introdução ao Tarot (PDF)</Text>
        </TouchableOpacity>

        {/* Video Items */}
        <View style={styles.videoItem}>
          <MaterialIcons name="play-circle-outline" size={28} color="#fff" style={styles.icon} />
          <Text style={styles.videoLabel}>História e Origens</Text>
        </View>

        <View style={styles.videoItem}>
          <MaterialIcons name="play-circle-outline" size={28} color="#fff" style={styles.icon} />
          <Text style={styles.videoLabel}>Como Ler as Cartas</Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal customizada */}
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Introdução ao Tarot"
      >
        <Text style={{ color: "#ccc", fontSize: 16, lineHeight: 24 }}>
          O Tarot é um sistema simbólico e intuitivo que combina imagens, arquétipos, cores e narrativas para facilitar a reflexão, o autoconhecimento e a orientação pessoal.
          {"\n\n"}
          Apesar de muitas vezes associado a práticas esotéricas ou divinatórias, o Tarot é, acima de tudo, uma ferramenta de linguagem simbólica e de leitura do mundo, usada em contextos terapêuticos, espirituais e artísticos. Ele não se limita a um único conjunto fixo de cartas ou estrutura. Existem diferentes sistemas de baralhos de Tarot, cada um com seu estilo, filosofia e forma de organização, o que torna seu estudo ainda mais rico e diverso.
          {"\n\n"}
          Enquanto muitos baralhos seguem a estrutura tradicional com Arcanos Maiores e Menores, outros se organizam de formas únicas, com quantidades e categorias próprias de cartas. Há ainda baralhos oraculares que, embora inspirados no Tarot, seguem caminhos diferentes, mantendo a essência simbólica e reflexiva.
          {"\n\n"}
          Ao consultar o Tarot, o consulente busca não prever o futuro, mas refletir sobre o presente e encontrar
          caminhos possíveis a partir das circunstâncias atuais.
          {"\n\n"}
          Tipos de Baralhos de Tarot
          Abaixo, apresento um panorama geral de alguns dos principais tipos de baralho dentro do universo do Tarot:
          {"\n\n"}
          🃏 Tarot Tradicional (como o Rider-Waite-Smith ou o Tarot de Marselha)
          Contém 78 cartas, divididas entre 22 Arcanos Maiores e 56 Arcanos Menores.
          {"\n\n"}
          Os Arcanos Maiores representam grandes arquétipos e lições de vida.
          {"\n\n"}
          Os Menores dividem-se em quatro naipes (Paus, Copas, Espadas, Ouros), refletindo o cotidiano e as emoções humanas.
          {"\n\n"}
          🌌 Tarot de Thoth
          Criado por Aleister Crowley, é conhecido por sua arte complexa e simbologia ocultista.
          {"\n\n"}
          Possui também 78 cartas, mas com interpretações esotéricas próprias, muitas vezes ligadas à astrologia, cabala e alquimia.
        </Text>
      </CustomModal>
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
  pageTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  videoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    marginBottom: 15,
  },
  icon: {
    marginRight: 15,
  },
  videoLabel: {
    color: "#fff",
    fontSize: 18,
  },
  backButton: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 40,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    marginTop: 30,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
